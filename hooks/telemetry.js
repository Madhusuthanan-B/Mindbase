#!/usr/bin/env node
'use strict';

// One-time, disclosed, opt-out "plugin activated" ping. See README > Telemetry.
//
// Hard rule: this script must NEVER throw, hang, or block Claude Code. Every path
// below is wrapped so failures are swallowed, and two independent caps guarantee
// it always exits quickly even if a network call or the filesystem misbehaves:
//   - REQUEST_TIMEOUT_MS bounds the network call itself (aborted, not just ignored)
//   - WATCHDOG_MS is a backstop that force-exits the process no matter what hangs
// The SessionStart hook is also registered with "async": true, so even a full
// WATCHDOG_MS stall here never delays session start.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');

const POSTHOG_API_KEY = 'phc_w34ThVcADzqFCNpgcLWAaqkbvpHopBVXvVnjvYA3tQtv'; // PostHog project 53802 — public write-only key, safe to commit
const POSTHOG_URL = 'https://us.i.posthog.com/capture/';
const REQUEST_TIMEOUT_MS = 3000; // hard cap on the network call
const WATCHDOG_MS = 5000; // absolute cap: force-exit no matter what hangs

const CONFIG_DIR = path.join(os.homedir(), '.mindbase');
const CONFIG_PATH = path.join(CONFIG_DIR, 'telemetry.json');

const watchdog = setTimeout(() => process.exit(0), WATCHDOG_MS);
watchdog.unref();

process.on('uncaughtException', () => process.exit(0));
process.on('unhandledRejection', () => process.exit(0));

main()
  .catch(() => {})
  .finally(() => process.exit(0));

async function main() {
  // Every branch below is wrapped so an unexpected error — a bad config file, a
  // crypto/env quirk, anything — is swallowed here rather than propagating up.
  try {
    if (!process.stdout.isTTY || process.env.CI) return; // non-interactive: stay silent, persist nothing

    const config = readConfig();
    if (config.activationSentAt) return; // already handled, ever — nothing to do

    const enabled = resolveEnabled(config);
    const distinctId = config.distinctId || crypto.randomUUID();
    const now = new Date().toISOString();

    console.log(
      '[mindbase] sends one anonymous, one-time "plugin activated" ping (no prompts, files, ' +
        'or paths) unless disabled. Turn off: set DO_NOT_TRACK=1 or MINDBASE_TELEMETRY=0, or ' +
        'delete ~/.mindbase/telemetry.json. Details: ' +
        'https://github.com/Madhusuthanan-B/Mindbase#telemetry'
    );

    writeConfig({ distinctId, enabled, disclosedAt: config.disclosedAt || now, activationSentAt: now });

    if (!enabled) return;

    try {
      await sendEvent(distinctId);
    } catch {
      // a network failure (or anything sendEvent throws) must never surface
    }
  } catch {
    // belt-and-suspenders: an unexpected error anywhere above must never block
    // Claude Code or surface to the user. The outer main().catch() and the
    // process-level uncaughtException/unhandledRejection handlers below are
    // further backstops in case something throws outside this try block.
  }
}

function resolveEnabled(config) {
  const doNotTrack = (process.env.DO_NOT_TRACK || '').trim();
  if (doNotTrack && doNotTrack !== '0') return false;

  const flag = (process.env.MINDBASE_TELEMETRY || '').trim().toLowerCase();
  if (['0', 'false', 'off'].includes(flag)) return false;
  if (['1', 'true', 'on'].includes(flag)) return true;

  if (typeof config.enabled === 'boolean') return config.enabled;

  return true; // default: on, but disclosed above before anything is sent
}

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function writeConfig(config) {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch {
    // best-effort only — a failed write just means we may ask again next session
  }
}

async function sendEvent(distinctId) {
  if (typeof fetch !== 'function') return; // older Node without global fetch: skip rather than risk a hang

  let version = '0.0.0';
  try {
    version = require(path.join(__dirname, '..', '.claude-plugin', 'plugin.json')).version;
  } catch {
    // fall back to default above
  }

  const body = JSON.stringify({
    api_key: POSTHOG_API_KEY,
    event: 'plugin_activated',
    distinct_id: distinctId,
    properties: {
      plugin: 'mindbase',
      version,
      os: process.platform,
      node: process.version,
    },
  });

  await fetch(POSTHOG_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}
