# Contributing to Mindbase

Thanks for considering a contribution. Mindbase is a small, single-maintainer
project — a set of Claude Code skills, not a framework — so the bar for
contributing is low, but a few things make review faster.

## Ways to contribute

- **Bug reports** — something a skill did wrong, or a knowledge-graph bundle it
  produced that doesn't conform to [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md).
- **Feature requests** — a new capture pattern, a new `brain-query` mode, a new
  persona for `brain-setup`.
- **Skill improvements** — clearer prompts in `skills/*/SKILL.md`, better
  handling of edge cases in capture/maintain/query.
- **Docs** — README, this file, or `docs/`.

Use the issue templates when opening an issue; they'll guide you through what's
useful to include.

## Before you start

For anything beyond a small fix, open an issue first describing what you want
to change and why — it avoids duplicated work and lets us agree on the
approach before you invest time in a PR.

## Development setup

Mindbase has no build step and no dependencies beyond Node (used only by the
optional telemetry hook). To try your changes locally:

```bash
git clone https://github.com/Madhusuthanan-B/Mindbase.git
cd Mindbase
claude --plugin-dir .
```

This loads the plugin from your working copy instead of the installed
marketplace version. After editing a skill, run `/reload-plugins` (add
`--force` if Claude Code warns about an invalidated prompt cache) to pick up
the change without restarting the session.

## Testing changes

There's no automated test suite — validate manually:

- **Skill changes** (`skills/*/SKILL.md`): run the skill against a scratch
  project and check the output makes sense end to end (e.g. run `brain-capture`
  on some sample notes, then `brain-query` against the result).
- **Knowledge bundle / OKF changes**: any bundle a skill produces should stay
  spec-conformant. If you have the [OKF plugin](https://github.com/GoogleCloudPlatform/knowledge-catalog)
  installed, run its validator against a bundle your change produced.
- **`hooks/telemetry.js` changes**: this script must never throw, hang, or
  block a session — see the comments at the top of the file for the invariants
  it has to preserve. Run it directly (`node hooks/telemetry.js`) and confirm
  it still exits quickly and cleanly, including with `DO_NOT_TRACK=1` set and
  with `~/.mindbase/telemetry.json` deleted.
- **Plugin manifest changes** (`.claude-plugin/plugin.json`, `hooks/hooks.json`):
  run `claude plugin validate .` before submitting.

## Style

- Keep `SKILL.md` files in plain, direct language — they're prompts, not prose
  for humans to admire.
- Match the existing tone in the README and docs: concise, no marketing
  language.
- No new dependencies without discussion — the whole point of this project is
  that it's a handful of markdown files and a couple of small scripts.

## Submitting a pull request

- Keep PRs focused — one change per PR is easier to review than a bundle of
  unrelated fixes.
- Fill in the PR template; it's short.
- Bump the `version` in `.claude-plugin/plugin.json` if your change affects
  behavior a user would notice (matches the project's own release convention).
- Reference the issue your PR addresses, if there is one.

By participating in this project you agree to abide by the
[Code of Conduct](CODE_OF_CONDUCT.md).
