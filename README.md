# Mindbase

**Format**: [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) (Open Knowledge Format)
**Vault**: `knowledge/` (also the Obsidian vault root)
**Install**: `git clone`, or as a [Claude Code plugin](#install) — no cloning needed

🌐 **[View the interactive overview →](https://madhusuthanan-b.github.io/Mindbase/)**

A bare-minimal, **domain-agnostic** personal knowledge base: capture whatever you work
with as plain markdown files, browse and query them via a handful of agent skills, and
optionally watch the relationships form a colorful graph in Obsidian — that's an internal
choice, not a requirement; any tool that can view markdown works just as well.

*Curious why this exists, where the idea comes from, or how it compares to Obsidian,
Notion, or an agent's own memory feature? See [`docs/why-mindbase.md`](docs/why-mindbase.md)
and [`docs/comparisons.md`](docs/comparisons.md).*

## Install

There are two ways to get these skills, and you can mix both across different machines
or projects:

**Clone it** (works with any coding agent — see "Using these skills in other tools"
further down for the compatibility details):

```bash
git clone https://github.com/Madhusuthanan-B/Mindbase.git
```

Then open the cloned folder in your agent of choice and jump to "Getting started" below.

**Install as a Claude Code plugin** (Claude Code only, no per-vault copying):

```
/plugin marketplace add Madhusuthanan-B/Mindbase
/plugin install mindbase@mindbase-marketplace
```

This registers `/brain-setup`, `/brain-capture`, `/brain-query`, `/brain-maintain`
globally — they work in *any* project you open in Claude Code. A "vault" is just
whichever project folder you have open; running `brain-setup` in a new folder creates
only its `knowledge/` bundle (skills are already global, so nothing else gets copied
in). See [`docs/why-mindbase.md`](docs/why-mindbase.md#compose-your-own-vaults) for
running multiple vaults side by side.

## Getting started

Every skill takes the same **plain-language request** no matter what tool you use — the
request itself is agent-agnostic. Only how you hand it to the agent differs:

- **Any agent or chat UI**: paste the skill file (e.g. `skills/brain-setup/SKILL.md`) as
  your prompt, then add your plain-language request underneath it.
- **Claude Code**: skip the paste — type the matching `/brain-*` slash command followed
  by the same request (wired via `.claude/commands/`; Cursor/Copilot equivalents are in
  "Using these skills in other tools" further down).

The tables below give both forms side by side for each skill — the left column works
anywhere, the right column is the Claude Code shortcut for it.

1. **Bootstrap your workspace** — persona-driven folder picker, so your first folders
   fit your own domain (or skip this and just start capturing into `concepts/`):

   | Say (any agent) | Claude Code |
   | --- | --- |
   | "I'm a software engineer — set up Mindbase for me." | `/brain-setup I'm a software engineer — set up Mindbase for me` |
   | "Set up the right kind of knowledge structure for me — suggest a few options and I'll pick one." | `/brain-setup suggest a few folder structures and I'll pick one` |
   | "I'm a project manager. I work on client engagements — contracts, deadlines, deliverables. Suggest folders that fit that." | `/brain-setup I'm a project manager, I work on client engagements — contracts, deadlines, deliverables, suggest folders that fit that` |

2. **Capture your first note.** `brain-capture` turns whatever you type — a note, a
   meeting recap, a decision, a fact about a tool — into linked OKF concept files, and
   grows new folders on its own when something doesn't fit yet. Just describe what
   happened, in your own words:

   | Say (any agent) | Claude Code |
   | --- | --- |
   | "I just set up Mindbase as my personal knowledge base, following the OKF spec." | `/brain-capture I just set up Mindbase as my personal knowledge base, following the OKF spec.` |
   | "Sprint planning today — team decided to move the notification service off cron polling to an SQS-based event queue after missing three alerts last week, targeting end of Q3." | `/brain-capture Sprint planning today — team decided to move the notification service off cron polling to an SQS-based event queue after missing three alerts last week, targeting end of Q3.` |
   | "Quick note on Obsidian: it's the markdown editor we're using to browse the graph, free for personal use." | `/brain-capture Quick note on Obsidian: it's the markdown editor we're using to browse the graph, free for personal use.` |
   | "Add to my todo list: follow up with the vendor about the contract renewal by Friday." | `/brain-capture Add to my todo list: follow up with the vendor about the contract renewal by Friday.` |

3. Open `knowledge/` in Obsidian and watch the graph grow as you capture more.

4. **Find what you've captured.** `brain-query` supports search / explore / list / path
   / timeline / tags / summary:

   | Say (any agent) | Claude Code |
   | --- | --- |
   | "Search for anything about the new pricing model." | `/brain-query search pricing model` |
   | "Explore the Q3 roadmap decision — what's connected to it?" | `/brain-query explore q3-roadmap` |
   | "List everything tagged as a decision." | `/brain-query list decisions` |
   | "How are the outage last week and the new deploy process related?" | `/brain-query path outage-incident deploy-process` |
   | "Show me a timeline of everything I've captured." | `/brain-query timeline` |
   | "Summarize what's in my knowledge base so far." | `/brain-query summary` |
   | "What's on my todo list right now?" | `/brain-query list todos` |

5. **Keep the bundle healthy.** Run `brain-maintain` periodically — describe what kind
   of upkeep you want, in your own words (`health` is the good default to start with):

   | Say (any agent) | Claude Code |
   | --- | --- |
   | "Check my knowledge base for broken links, orphan notes, or anything stale." | `/brain-maintain health` |
   | "Take a look at my folders and tell me if any should be merged, split, or renamed." | `/brain-maintain reorganize` |
   | "'draft-notes' and 'okf-spec' are the same thing — merge them." | `/brain-maintain merge draft-notes okf-spec` |
   | "Flesh out my mindbase-setup note with more detail and related links." | `/brain-maintain enrich mindbase-setup` |
   | "What did I capture this past week? Anything I left incomplete?" | `/brain-maintain review` |

## Telemetry

If you install Mindbase as a Claude Code plugin, it sends **one anonymous ping** the
first time you use it — a `plugin_activated` event with the plugin version, your OS, and
your Node version. No prompts, no file paths, no vault contents, nothing about what you
capture — just a signal that helps size adoption. Nothing is sent again after that first
ping.

Sent via `hooks/telemetry.js` (runs once at session start; never fires if you clone
instead of installing as a plugin) to [PostHog](https://posthog.com), a free-tier managed
analytics service:

- **Disclosed before it sends anything** — the first run prints what it's about to do.
- **Opt-out, anytime**: `DO_NOT_TRACK=1`, `MINDBASE_TELEMETRY=0`, or delete
  `~/.mindbase/telemetry.json`.
- **Always off** in CI or any non-interactive session.
- **Never blocks or slows down Claude Code**: async, 3s network timeout, every path
  wrapped so failures are swallowed rather than surfaced.

See [SECURITY.md](SECURITY.md) for the security angle, including why the embedded
PostHog key is safe to be public.

## Domains

Folders are a pure organizational + Obsidian-coloring convention — OKF itself has no
fixed taxonomy, and this bundle deliberately doesn't assume one either. `brain-setup`
offers a few starter presets:

| Persona | Folders |
| --- | --- |
| Generic / general knowledge worker | `concepts/`, `people/`, `projects/`, `decisions/`, `resources/` |
| Software engineering | `concepts/`, `technologies/`, `meetings/`, `decisions/`, `projects/`, `people/`, `products/` |
| Medical / healthcare | `concepts/`, `cases/`, `guidelines/`, `research/`, `people/`, `meetings/` |
| Finance | `concepts/`, `instruments/`, `models/`, `decisions/`, `meetings/`, `people/`, `regulations/` |
| Academic / research | `concepts/`, `papers/`, `experiments/`, `people/`, `projects/` |
| Legal | `concepts/`, `cases/`, `contracts/`, `clients/`, `regulations/`, `meetings/` |
| Product management | `concepts/`, `products/`, `features/`, `decisions/`, `customers/`, `meetings/` |
| Marketing / sales | `concepts/`, `campaigns/`, `customers/`, `competitors/`, `meetings/` |
| HR / people ops | `concepts/`, `people/`, `policies/`, `hiring/`, `meetings/` |
| Education / teaching | `concepts/`, `courses/`, `students/`, `lessons/`, `resources/` |
| Consulting | `concepts/`, `clients/`, `engagements/`, `deliverables/`, `meetings/` |
| Design / creative | `concepts/`, `projects/`, `assets/`, `feedback/`, `people/` |
| Personal / life admin | `concepts/`, `finances/`, `health/`, `goals/`, `people/` |
| Custom | type your own folder list |

Whichever folders you end up with get colors assigned in order from a shared 12-color
palette (see `skills/brain-setup/SKILL.md` for the full table — Blue, Green, Purple, Amber,
Orange, Cyan, Pink, Red, Teal, Yellow, Indigo, Gray). New folders can also appear
**organically** through `brain-capture` when a concept doesn't fit anything existing,
and `brain-maintain`'s taxonomy review flags folders worth merging, splitting, or
retiring as the bundle evolves. Full detail lives in `knowledge/README.md`.

## Skills (`skills/`)

| Skill | Purpose |
| --- | --- |
| `brain-setup` | Bootstrap a brand-new Mindbase workspace, persona-driven folder picker |
| `brain-capture` | Turn notes/meeting summaries into OKF concept files + links; grows new folders organically when needed |
| `brain-query` | Search, explore neighborhoods, list by type, find paths, timeline, tags, summary |
| `brain-maintain` | Health checks, merge duplicates, reorganize (incl. taxonomy review), enrich, review recent captures |

`skills/` is the canonical, vendor-neutral source for every skill; `.claude/commands/`
ships four thin wrapper files that just say "follow `skills/<skill>/SKILL.md` using this
as `$ARGUMENTS`" — that's what gives Claude Code native `/brain-*` slash commands in a
plain clone without duplicating any logic.

Not using Claude Code? See "Using these skills in other tools" below — or just paste a
skill file's content into any chat/agent as your prompt, with your notes or query
appended.

## Using these skills in other tools

`skills/<skill>/SKILL.md` is the single source of truth — every tool-specific wrapper
just points back to it, so you never edit skill logic in two places.

- **Claude Code**: already wired via `.claude/commands/` (see above) — `/brain-setup`,
  `/brain-capture`, `/brain-query`, `/brain-maintain` work out of the box.
- **Cursor**: drop the same kind of one-line wrapper into `.cursor/commands/`, e.g.
  `.cursor/commands/brain-capture.md` containing "Read and follow
  `skills/brain-capture/SKILL.md`, using this as `$ARGUMENTS`: $ARGUMENTS" — Cursor lists
  it as a `/brain-capture` command in chat. (Cursor Commands landed in Cursor 1.6; check
  Cursor's current docs for the exact `$ARGUMENTS`-equivalent syntax if this doesn't work
  verbatim.)
- **GitHub Copilot** (VS Code / Visual Studio / JetBrains): same pattern as a
  `.github/prompts/brain-capture.prompt.md` file, invoked as `/brain-capture` in Copilot
  Chat. This is a preview feature and, as of this writing, isn't available in the
  Copilot CLI.
- **Anything else** (a different agent, a plain chat UI, an API call): no wrapper needed
  — paste the relevant `skills/<skill>/SKILL.md` file's content as your prompt and
  append your notes or query where it says `$ARGUMENTS`. This always works, since a skill
  file is just plain instructions in markdown; native slash-command support is a
  convenience on top, not a requirement.

## Directory layout

See [`docs/architecture.drawio`](docs/architecture.drawio) for a visual walkthrough of
how the pieces below fit together (agent tools → skills → the `knowledge/` bundle →
Obsidian).

```
Mindbase/                           ← repo root (clone this anywhere)
├── README.md
├── docs/
│   └── architecture.drawio        ← visual architecture diagram (draw.io)
├── skills/                       ← canonical, vendor-neutral skill definitions
│   ├── brain-setup/SKILL.md      ← bootstrap a new Mindbase workspace (persona picker)
│   ├── brain-capture/SKILL.md    ← extract notes into OKF concepts; grows folders organically
│   ├── brain-query/SKILL.md      ← search/explore/list/path/timeline/tags/summary
│   └── brain-maintain/SKILL.md   ← health/merge/reorganize (incl. taxonomy review)/enrich/review
├── .claude/commands/             ← thin wrappers so Claude Code gets native /brain-* commands
│   ├── brain-setup.md
│   ├── brain-capture.md
│   ├── brain-query.md
│   └── brain-maintain.md
└── knowledge/                    ← OKF bundle root == Obsidian vault root
    ├── index.md                  ← okf_version: "0.2", links to each current domain
    ├── README.md                 ← type: Documentation — how this bundle grows
    ├── log.md                    ← dated change history, newest first
    ├── concepts/index.md         ← the one universal seed folder, present in every clone
    ├── <your-domain-1>/index.md  ← created by brain-setup or organically by brain-capture
    ├── <your-domain-2>/index.md
    └── .obsidian/                ← graph view colors + core plugin config
        ├── app.json
        ├── appearance.json
        ├── core-plugins.json
        └── graph.json
```

A fresh clone ships with only `concepts/` pre-created — run `brain-setup` to bootstrap
folders that fit your own domain (see "Domains" above), or just start capturing and let
folders appear as needed.

## Concept file shape

```markdown
---
type: Technology
title: Human Readable Title
description: One-line summary
tags:
  - tag1
  - tag2
generated:
  by: claude-code/brain-capture
  at: 2026-09-01T00:00:00Z
status: stable
---

# Title

## Overview
What it is and why it matters.

## Key Details
Important notes, gotchas, how it's used.

## Related
- [Other Concept](../<folder>/<concept>.md) — relation described in prose
```

(Folder names in links are illustrative — use whatever folders actually exist in your
bundle; there's no fixed set.)

## Obsidian

Optional — `knowledge/` is just markdown, viewable in any editor. Obsidian is a nice way
to *see* the graph if you want it:

1. Open Obsidian → "Open folder as vault" → select `knowledge/`.
2. Open Graph view (Ctrl/Cmd+G) — nodes are pre-colored by domain folder.
3. Relationships are plain markdown links inside each concept's `## Related` section —
   Obsidian renders these as graph edges automatically, no extra config needed.

## Validation

If the `okf` Claude Code plugin is installed, validate conformance with:

```bash
uv run <okf-plugin-path>/skills/validate/scripts/okf_validate.py knowledge --strict
```

Resolve every `ERROR` (missing/empty `type`, malformed frontmatter). `WARNING`s are
soft — fix when cheap, never blocking.

## Why OKF

[OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
was built to help organizations share and catalog *data* consistently, not personal notes
— but the rule that makes it work there (every file is typed, so any tool can pick it up
and know what it's looking at) is just as useful for a personal knowledge base. Mindbase
adopts **OKF v0.2** as its knowledge standard:

- One concept = one markdown file. The only hard rule: every concept file needs a
  parseable YAML frontmatter block with a non-empty `type` (a free string — no fixed
  taxonomy is enforced by the spec).
- No master index file. Relationships are **plain markdown links** between concept
  files; the relation's *kind* (decided-by, depends-on, blocks, ...) lives in the prose
  around the link, not in a schema field.
- `index.md` (directory listing) and `log.md` (dated change history) are the only
  reserved, non-concept filenames — used for navigation, not as a graph index.
- Optional-but-useful frontmatter families: `generated: {by, at}` / `verified` (trust),
  `status` / `stale_after` (lifecycle), `sources` (provenance).

This makes the bundle portable to any OKF-aware tool, not just this specific skill set —
Mindbase isn't yet another one-off note format.

## Documented deviations from the OKF spec defaults

1. **Bundle root is the visible `knowledge/` folder**, not the spec's suggested default
   `.okf/` dot-folder — chosen so it doubles as a normal Obsidian vault root. `.okf/`
   makes sense when a bundle lives *alongside* other project files, but dot-folders are
   hidden by default in Finder/Explorer and in Obsidian's own "Open folder as vault"
   picker — friction this repo doesn't need since the vault is the entire point of it,
   not something embedded in a larger codebase.
2. **Cross-links use relative paths** (e.g. `../<folder>/<concept>.md`) rather than OKF's
   recommended absolute bundle-relative form (`/<folder>/<concept>.md`). Obsidian reliably
   resolves relative links for both graph-view edges and click-navigation; a
   leading-slash absolute link isn't guaranteed to resolve the same way in Obsidian.

Both are minor, intentional trade-offs for Obsidian compatibility — the bundle otherwise
follows OKF v0.2 as written, and remains valid OKF (the spec doesn't mandate link form or
bundle location).

## Contributing

Bug reports, feature requests, and PRs are welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md) for local setup and testing, and
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community guidelines. Found a security
issue? See [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Learn more

- [`docs/why-mindbase.md`](docs/why-mindbase.md) — the problem this solves, where the
  idea comes from, and using it beyond work
- [`docs/design.md`](docs/design.md) — why it's dependency-free and built to be tweaked
- [`docs/comparisons.md`](docs/comparisons.md) — how it differs from code-graph tools and
  an agent's built-in memory
- [`docs/architecture.drawio`](docs/architecture.drawio) — visual architecture diagram
