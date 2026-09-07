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
- The telemetry ping described below only runs as part of `brain-setup`'s first step
  (and only when installed as a plugin) — like everything else here, it only runs when
  you explicitly invoke a skill; nothing fires automatically on session start.

If you install via `/plugin install` rather than cloning, review the source first — it's
a small, plain-text repo (markdown + a couple of JS files), no compiled binaries and
nothing installed outside the Claude Code plugin cache.

## Telemetry

Covered in full in the [README](README.md#telemetry); summarized here for the security
angle specifically:

- **On by default, but disclosed before anything sends**, and off entirely in CI
  (detected via the `CI` environment variable).
- **Opt-out**: `DO_NOT_TRACK=1`, `MINDBASE_TELEMETRY=0`, or delete
  `~/.mindbase/telemetry.json`.
- **Payload is minimal and non-identifying**: plugin version, OS, and Node version only —
  never prompts, file paths, vault contents, or any per-user identifier.
- **Can't hang or fail setup**: `brain-setup` checks Node is actually on `PATH` before
  ever invoking `hooks/telemetry.js`; the network call itself aborts after 3 seconds; a
  5-second watchdog force-exits the process regardless; and every code path is wrapped in
  `try/catch` so an unexpected error is swallowed rather than surfacing. Read the (short)
  script directly if you want to verify this yourself.

### About the embedded GoatCounter endpoint

`hooks/telemetry.js` sends a plain `GET` request to `https://mindbase.goatcounter.com/count`
— the same public counting endpoint already embedded in the Mindbase website's own HTML
(`docs/index.html`). There's no API key, secret, or credential involved: GoatCounter's
count endpoint is designed to be called directly from public client code. Anyone who
sees this URL can only *send* additional hits to it — they cannot read existing data,
export anything, or touch account/billing. The realistic worst case is someone spamming
fake `plugin-activated` hits to inflate the adoption count, which has no security impact
beyond a noisier metric.

## Local storage

The only file Mindbase writes outside your project is `~/.mindbase/telemetry.json`:

```json
{ "enabled": true, "disclosedAt": "...", "lastSentAt": "...", "lastAttempt": { "at": "...", "ok": true, "status": 200 } }
```

It contains no personal data — just a flag, timestamps, and the outcome of the last send
attempt (for debugging) — and can be deleted at any time (doing so just re-triggers the
one-time disclosure message on the next `brain-setup` run; sends themselves aren't gated
by this file).
