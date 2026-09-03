# Security

Mindbase is a set of Claude Code skills that read and write plain markdown files in
whatever project you open — plus one small, optional telemetry hook. This document
covers both.

## Reporting a vulnerability

Please **don't open a public issue** for anything sensitive (e.g. a way for a captured
note to trigger unintended file access, or a flaw in the telemetry hook). Instead use
GitHub's private reporting: open the repo's **Security** tab →
**Report a vulnerability** (`https://github.com/Madhusuthanan-B/Mindbase/security/advisories/new`).
We'll respond and coordinate a fix before any public disclosure.

## What Mindbase touches

Mindbase has no server, no account, and no CLI of its own — everything runs as Claude
Code skills inside your own session:

- `brain-setup`, `brain-capture`, `brain-query`, `brain-maintain` read and write markdown
  files under the `knowledge/` bundle in the project you have open, following the [Open
  Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
  spec. They never read outside that project folder, never make network calls, and never
  see credentials.
- The only thing that runs unconditionally is the `SessionStart` telemetry hook
  described below — everything else only runs when you explicitly invoke a skill.

If you install via `/plugin install` rather than cloning, review the source first — it's
a small, plain-text repo (markdown + a couple of JS files), no compiled binaries and
nothing installed outside the Claude Code plugin cache.

## Telemetry

Covered in full in the [README](README.md#telemetry); summarized here for the security
angle specifically:

- **On by default, but disclosed before anything sends**, and off entirely in CI or any
  non-interactive session.
- **Opt-out**: `DO_NOT_TRACK=1`, `MINDBASE_TELEMETRY=0`, or delete
  `~/.mindbase/telemetry.json`.
- **Payload is minimal and non-identifying**: plugin version, OS, Node version, and a
  random UUID generated locally (`crypto.randomUUID()`) — never prompts, file paths, or
  vault contents.
- **Can't hang or fail your session**: the hook (`hooks/telemetry.js`) is registered
  `"async": true` so it never blocks session start; the network call itself aborts after
  3 seconds; a 5-second watchdog force-exits the process regardless; and every code path
  is wrapped in `try/catch` so an unexpected error is swallowed rather than surfacing.
  Read the (short) script directly if you want to verify this yourself.

### About the embedded PostHog key

`hooks/telemetry.js` contains a plaintext PostHog **project API key**. This is
intentional, not a leaked secret: PostHog project keys are write-only and meant to be
embedded in client code, the same trust model as a Google Analytics measurement ID or a
Mixpanel project token. Anyone who reads it from this public repo can only *send* events
into that PostHog project — they cannot read existing data, export anything, or touch
account/billing. The realistic worst case is someone spamming fake `plugin_activated`
events to inflate the adoption count, which has no security impact beyond a noisier
metric.

## Local storage

The only file Mindbase writes outside your project is `~/.mindbase/telemetry.json`:

```json
{ "distinctId": "<random uuid>", "enabled": true, "disclosedAt": "...", "activationSentAt": "..." }
```

It contains no personal data — just a random ID and timestamps — and can be deleted at
any time (doing so also resets the one-time-ping state and re-triggers disclosure on
next use).
