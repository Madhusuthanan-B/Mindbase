# Mindbase

**Format**: [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) (Open Knowledge Format)
**Vault**: `knowledge/` (also the Obsidian vault root)

🌐 **[View the interactive overview →](https://madhusuthanan-b.github.io/Mindbase/)**

We've always talked about knowledge in the shape of branches and trees — "a branch of
science", a family tree, a decision tree. The oldest known attempt to actually draw this
out is the <a href="https://www.quora.com/What-is-a-porphyrian-tree" target="_blank" rel="noopener">**Porphyrian Tree**</a>, sketched by the philosopher Porphyry in the 3rd century AD
as a commentary on Aristotle — the first known branching diagram used to classify
concepts, splitting broad categories into narrower and narrower ones. Mindbase runs on
that same instinct, made practical: a bare-minimal, **domain-agnostic** personal knowledge
base — capture whatever you work with as plain markdown files, browse and query them via a
handful of agent skills, and optionally watch the relationships form a colorful graph in
Obsidian — that's an internal choice, not a requirement; any tool that can view markdown
works just as well.

## The problem

Most of what we learn — at work or anywhere else — never gets written down anywhere
useful: it's buried in a WhatsApp chat, a Teams thread, an email you'll never find again, a
voice recording, a web page you skimmed once, an internal wiki page that's gone stale,
a personal notes file, a browser bookmark you'll never revisit, a ticket sitting on some
board, a to-do list on your phone or PC, or scattered across three different note-taking
apps — and a dozen other places besides. And when something does get
written down, it's usually one flat note, disconnected from everything else it relates
to — so when you actually need it, you're piecing it together from memory instead of just
looking it up. Fixing that used to mean adopting yet another note-taking app or getting a
whole team onto an enterprise wiki. It doesn't anymore: coding agents are already part of
daily work for a lot of us, reading and writing files all day — the same agent can just as
easily capture what you learn as you go, in plain markdown, with no separate app,
subscription, or admin console required. A graph doesn't have the flat-document problem
either: you can follow how a decision came about, or see everything tied to a project at a
glance, instead of relying on memory or search-and-hope.

## Beyond work

This isn't just a work habit, either. The same idea works for any domain where the raw
material is scattered across apps, pages, and conversations but never curated into one
place — personal finance, health, stock research, a hobby you're deep in. Once you've
captured what actually matters into a vault, instead of leaving it spread across bank
statements, browser tabs, and screenshots, an agent can reason over it, connect it, and
help you analyze it and make decisions — the same way it would help you navigate a
codebase. The vault becomes something you can *think with*, not just search.

## Compose your own vaults

And there's no single "the" vault. Mindbase is a template, not a hosted product — clone
it as many times as you want, one per vault, and compose them however suits how you
actually think. Keep a `mindbase-work` repo for your job, a `mindbase-finance` repo for
budgeting and investment research, a `mindbase-health` repo for medical history, or one
`mindbase-life` repo that deliberately blends personal finance with stock research because
that's how you connect the dots. The boundary between vaults — by domain, by life vs.
work, or no boundary at all — is a decision the tool leaves entirely to you.

Installed the [Claude Code plugin](#install) instead of cloning? Same idea, no cloning
needed — a "vault" is just whichever project folder you currently have open, so
`mindbase-work`, `mindbase-finance`, etc. become project folders you switch between
instead of separate clones.

## Make it yours

This is intentionally minimal — tweak the folders, colors, frontmatter fields, and skill
prompts to fit your own workflow. The folder taxonomy in particular is not fixed: it's
persona-driven at setup and can keep evolving afterward (see "Domains" below), so the same
tool works whether you're tracking client contracts, medical cases, or code decisions,
without forcing your work into someone else's template.

**Works with any coding agent.** The skills in `skills/` are plain markdown prompts with
no vendor-specific syntax — they run the same way in Claude Code, GitHub Copilot, Cursor,
or any other agent you paste them into. Claude Code additionally gets native `/brain-*`
slash commands out of the box (see "Skills" below); other tools can get the same via a
one-line wrapper (see "Using these skills in other tools").

## Why OKF

[OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
was built to help organizations share and catalog *data* consistently, not personal notes
— but the rule that makes it work there (every file is typed, so any tool can pick it up
and know what it's looking at) is just as useful for a personal knowledge base. It means
Mindbase isn't yet another one-off note format — the files stay readable and reusable by
any OKF-aware tool, not just the skills in this repo.

## Where the idea comes from

The `skills/` folder is a small, concrete take on the
["LLM as wiki"](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
pattern — instead of you filing notes by hand, an agent does the writing, linking, and
tidying: `brain-capture` writes things down as they happen, `brain-query` looks them back
up, `brain-maintain` keeps the whole thing tidy.

This didn't start with OKF, either. I'd been running a plain version of this — markdown
notes in Obsidian, no format, no standard — as my daily driver at work since early 2026,
and it quietly proved itself: writing things down as they happen, connected instead of
scattered, genuinely made me more productive. OKF gave that habit a real, non-proprietary
format instead of my own ad hoc conventions, so it seemed worth rebuilding a bare-minimal
version properly and open-sourcing it, for anyone else who wants the same habit.

## Install

There are two ways to get these skills, and you can mix both across different machines
or projects:

**Clone it** (works with any coding agent, per the compatibility notes above):

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
globally — they work in *any* project you open in Claude Code, not just this repo.
"Multiple vaults" (work notes, personal notes, a client's notes, ...) just means opening
each one as its own project folder and running `brain-setup` inside it; the skill itself
is shared, only the `knowledge/` bundle it operates on changes based on what you have
open. When installed this way, `brain-setup` skips writing `skills/` and
`.claude/commands/` into the new vault, since the commands are already global — it only
creates the `knowledge/` bundle.

## Getting started

Every skill takes the same **plain-language request** no matter what tool you use — the
request itself is agent-agnostic. Only how you hand it to the agent differs:

- **Any agent or chat UI**: paste the skill file (e.g. `skills/brain-setup/SKILL.md`) as
  your prompt, then add your plain-language request underneath it.
- **Claude Code**: skip the paste — type the matching `/brain-*` slash command followed
  by the same request (wired via `.claude/commands/`; Cursor/Copilot equivalents are in
  "Using these skills in other tools" below).

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

**Note on `skills/` vs Claude Code slash commands**: the canonical, vendor-neutral
source for every skill lives in `skills/` — Claude Code doesn't auto-load that
directory from a plain clone (it does if you install Mindbase as a Claude Code plugin —
see "Install as a Claude Code plugin" below). `.claude/commands/` ships four thin
wrapper files (`brain-setup.md`, `brain-capture.md`, `brain-query.md`,
`brain-maintain.md`), each just a couple of lines that say "read and follow
`skills/<skill>/SKILL.md`, using this input as `$ARGUMENTS`". That gives Claude Code
native `/brain-setup`, `/brain-capture`, `/brain-query`, `/brain-maintain` slash
commands for free in a plain clone, while keeping all the actual logic in one place
(`skills/`) so it never drifts out of sync between the two copies.

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

Obsidian is not a prerequisite — it's an internal choice this template happens to ship
with pre-colored graph settings for, not a dependency `knowledge/` requires. You can use
Mindbase perfectly well without ever opening it: `knowledge/` is just a folder of plain
markdown files, so any markdown viewer, editor, or IDE (VS Code, a static-site generator,
`cat`, whatever you already reach for) works too. Obsidian is simply a nice way to *see*
the graph if you want the visualization.

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

## Technical choices

Mindbase is deliberately dependency-free: no database, no server, no SDK, no runtime, no
proprietary file format. A concept is a markdown file with a YAML frontmatter block —
nothing an agent or a text editor can't already read and write. That's not laziness, it's
the point:

- **Plain files stay yours.** Markdown in a git repo is portable, diffable, greppable, and
  works offline — no export step, no account, no risk of the tool disappearing and taking
  your notes with it.
- **No infrastructure to run or pay for.** Nothing to host, patch, back up, or subscribe
  to — the entire "system" is files plus whatever agent you already use.
- **Obsidian is a viewer, not a dependency.** It renders the graph nicely, but the
  `knowledge/` folder is just as usable without it — open it in any editor, or point
  another OKF-aware tool at it later.
- **Skills are prompts, not code.** `skills/<skill>/SKILL.md` files are plain-language
  instructions, so there's no library to install, version, or go out of date — any agent
  that can read a file and write a file can run them.

Every one of these choices trades a bit of polish (no fancy UI, no built-in sync, no
enforced schema beyond `type`) for staying simple enough that picking this up costs you
nothing beyond writing markdown files, and dropping it costs you nothing either.

## How this compares to code-graph tools

If you've seen tools like [Graphify](https://graphify.com/), [CodeGraph](https://github.com/colbymchenry/codegraph),
or [GitNexus](https://github.com/abhigyanpatwari/GitNexus), it's natural to assume Mindbase
is another entry in the same space. It isn't, and it's worth being precise about why:

- **Those tools index an artifact that already exists.** They parse a codebase (via
  tree-sitter/AST) into a graph of symbols, calls, and imports, so an AI coding agent can
  query code structure instead of grepping files. The graph is *derived*.
- **Mindbase captures things that were never written down anywhere.** A decision, a
  meeting outcome, a preference — there's no source artifact to parse, because the
  knowledge only ever existed in someone's head or a chat thread. The graph is
  *authored*, one concept at a time, as you go.
- Different consumer, too: theirs makes an AI agent cheaper and faster at editing code
  (fewer tool calls, less re-reading). Mindbase makes sure knowledge that would otherwise
  just be lost gets kept, connected, and findable later.

So they're not competitors — there's no shared job to be better or worse at. The closer
comparison is personal knowledge tools: Obsidian, Notion, Logseq. Against those, Mindbase
doesn't claim a smarter graph engine — Obsidian already gives you tags, properties, and
backlinks natively. What it actually adds is narrower and more honest:

- **An open, tool-agnostic file format** ([OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing))
  instead of a proprietary export format — the files are still just yours if you ever
  stop using Obsidian, Mindbase, or both.
- **An agent-native capture habit** — `skills/` that any coding agent can run to
  do the tedious part (writing consistent frontmatter, adding cross-links, keeping the
  folder taxonomy sane) instead of you doing that filing by hand.
- **Zero added infrastructure** — no plugin, no database, no server; if you can read and
  write a markdown file, you can use this, and you can stop using it just as easily.

## How this compares to an agent's built-in memory

Some agent platforms now ship their own memory feature — Claude's memory tool, for
example, lets an agent read and write files across sessions so it doesn't lose context on
a long task. It's fair to ask whether Mindbase is reinventing that. Right now, no — they
solve different problems:

- **Scoped to one agent vs. a shared vault.** Agent memory is client-side storage the
  model reads and writes inside one tool's own sessions (e.g. `/memories` in Claude's
  tool) — it's built to survive within that integration, not to be handed to a different
  agent or opened by a human. A Mindbase vault is plain markdown any agent, or you, can
  open next week whether or not it's this week's tool.
- **Loose notes vs. a typed graph.** Agent memory is files the model tidies as it goes —
  no concept types, no cross-linking model, no way to walk "what does this decision
  connect to" as a graph. The linked, typed OKF graph is the entire point of Mindbase, not
  a side effect of notes an agent happened to keep.
- **Invisible by design vs. yours to curate.** You're not meant to browse an agent's
  memory directory. A Mindbase vault is meant to be opened, read, and edited directly —
  in Obsidian, in a text editor, by hand — with the agent as a contributor to it, not the
  sole owner of it.

Worth being honest about the trajectory here: agent platforms are actively building out
memory, and it's reasonable to expect more of this — cross-session recall, maybe even
structure — to become a native feature over time. If that happens, that's a good outcome;
the underlying need (durable, connected knowledge) gets met either way, and this
comparison describes the current state, not a permanent moat. What's a deliberate design
choice rather than a placeholder is the part unlikely to change regardless: **open
format, portable across whatever agent you use, and readable without one in the loop at
all.**

## Why OKF

Mindbase adopts **OKF v0.2** as its knowledge standard:

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

This makes the bundle portable to any OKF-aware tool, not just this specific skill set.

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
