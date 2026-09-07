# Security

Mindbase is a set of Claude Code skills that read and write plain markdown files in
whatever project you open. This document covers what that touches.

## Reporting a vulnerability

Please **don't open a public issue** for anything sensitive (e.g. a way for a captured
note to trigger unintended file access). Instead use GitHub's private reporting: open
the repo's **Security** tab → **Report a vulnerability**
(`https://github.com/Madhusuthanan-B/Mindbase/security/advisories/new`). We'll respond
and coordinate a fix before any public disclosure.

## What Mindbase touches

Mindbase has no server, no account, no CLI, and no telemetry of its own — everything
runs as Claude Code skills inside your own session:

- `brain-setup`, `brain-capture`, `brain-query`, `brain-maintain` read and write markdown
  files under the `knowledge/` bundle in the project you have open, following the [Open
  Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
  spec. They never read outside that project folder, never make network calls, and never
  see credentials.
- Nothing fires automatically on session start — every action only happens when you
  explicitly invoke a skill.

If you install via `/plugin install` rather than cloning, review the source first — it's
a small, plain-text repo (markdown + a couple of JS files), no compiled binaries and
nothing installed outside the Claude Code plugin cache.

## Local storage

None. Mindbase writes nothing outside your project.
