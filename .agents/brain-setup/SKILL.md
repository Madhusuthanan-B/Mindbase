---
name: brain-setup
description: >-
  Bootstrap a new Mindbase workspace: OKF v0.2 bundle, persona-driven folder
  taxonomy, Obsidian graph-view config, and the brain-capture/brain-query/
  brain-maintain skills. Use when setting up Mindbase for the first time or
  cloning the template onto a new machine. Triggers on: "set up Mindbase",
  "bootstrap my knowledge base", "initialize the workspace".
user-invocable: true
argument-hint: "[workspace root] [persona]"
allowed-tools: Read Write Edit Grep Glob Bash
---

# Mindbase — Setup

You are a workspace bootstrap assistant. Your job is to set up a complete Mindbase
workspace from scratch on any machine — an OKF v0.2-conformant knowledge bundle with
Obsidian graph-view support, operated through the `brain-capture` / `brain-query` /
`brain-maintain` skills.

## Design principle: no fixed taxonomy

OKF doesn't mandate any folder structure — `type` is a free string. This bundle uses
folders purely as an organizational + Obsidian-coloring convenience, and the folder set
is meant to fit **whoever is using it**: a software engineer, a doctor, a finance
analyst, a researcher, or anyone else. So setup always starts by asking what the user's
domain looks like, rather than assuming one.

## What this creates

```
<MINDBASE_ROOT>/
├── README.md                     ← Architecture + usage docs
├── .agents/                      ← canonical, vendor-neutral skills (each a folder)
│   ├── brain-setup/SKILL.md      ← This file
│   ├── brain-capture/SKILL.md
│   ├── brain-query/SKILL.md
│   └── brain-maintain/SKILL.md
├── .claude/commands/             ← thin wrappers for native Claude Code /brain-* commands
│   ├── brain-setup.md
│   ├── brain-capture.md
│   ├── brain-query.md
│   └── brain-maintain.md
└── knowledge/                    ← OKF bundle root == Obsidian vault root
    ├── index.md                  ← okf_version: "0.2", links to each chosen domain
    ├── README.md                 ← type: Documentation — bootstrap/growth instructions
    ├── log.md                    ← dated change history
    ├── <folder-1>/index.md       ← one per chosen domain folder (see personas below)
    ├── <folder-2>/index.md
    ├── ...
    └── .obsidian/
        ├── app.json
        ├── appearance.json
        ├── core-plugins.json
        └── graph.json            ← colorGroups, one per chosen domain folder
```

Note: skills live under `.agents/`, not `.claude/commands/`. Claude Code does not
auto-load `.agents/` as slash commands — if the user wants `/brain-capture` etc. to work
natively in Claude Code, they (or you, if asked) must also write thin wrapper files into
`<MINDBASE_ROOT>/.claude/commands/`. Don't do this unprompted; it's a deliberate choice
to keep the skill definitions vendor-neutral.

## Step 1 — Gather configuration

Ask the user (or infer from context if already stated):

1. **Mindbase root path** — where should it live? (`<MINDBASE_ROOT>` below)
2. **Your name** — for `generated.by: human:<name>` when you hand-author concepts later,
   and for the README
3. **Persona / domain focus** — show the preset table below and ask them to pick one,
   pick-and-edit, or go fully custom:

   | Persona | Folders |
   |---|---|
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
   | Custom | user supplies their own folder list |

   `concepts/` is the universal catch-all — always include it even in a custom list, if
   the user doesn't mention it themselves. Presets are starting points, not commitments:
   the user can rename, drop, or add folders freely, both now and later (see "Organic
   growth" in `brain-capture` and the taxonomy review in `brain-maintain`).

Confirm the final folder list before proceeding.

## Step 2 — Create folder structure

```bash
mkdir -p "<MINDBASE_ROOT>/knowledge/.obsidian"
mkdir -p "<MINDBASE_ROOT>/.agents"
for folder in <chosen-folder-list>; do
  mkdir -p "<MINDBASE_ROOT>/knowledge/$folder"
done
```

## Step 3 — Write index.md, README.md, and log.md

`<MINDBASE_ROOT>/knowledge/index.md` — domain list generated from the chosen folders:
```markdown
---
okf_version: "0.2"
---

# <Bundle Title> — Knowledge Bundle

A personal knowledge graph stored as an OKF v0.2 bundle, viewable in Obsidian.

# Domains

* [<Folder 1 Title>](<folder-1>/) - <one-line purpose>
* [<Folder 2 Title>](<folder-2>/) - <one-line purpose>
  ...(one bullet per chosen folder)

# Documentation & History

* [README.md](README.md) - how this bundle is organized, and how to grow it
* [log.md](log.md) - dated change history for this bundle
```

`<MINDBASE_ROOT>/knowledge/README.md` — this is a normal OKF concept (not a reserved
filename), so it needs frontmatter with a non-empty `type`:
```markdown
---
type: Documentation
title: About This Bundle
description: How this Mindbase bundle is organized and how to grow it
generated:
  by: claude-code/brain-setup
  at: <ISO-8601 timestamp>
status: stable
---

# About This Bundle

This is an [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
knowledge bundle, bootstrapped for the **<persona>** persona.

## Current domains

<one bullet per chosen folder: `- **<folder>/** — <one-line purpose>`>

## Growing this bundle

- Folders here are a convenience, not a schema — OKF doesn't enforce any taxonomy.
- New domain folders can appear **organically**: when `brain-capture` finds a concept
  that doesn't fit an existing folder, it will propose a new one instead of forcing a
  bad fit.
- Run `brain-maintain` (taxonomy review, part of `reorganize` mode) occasionally to
  catch folders that have gone stale, near-empty, or overgrown, and get merge/split
  suggestions.
- Re-running `brain-setup` on a fresh clone will offer this same persona-picker, so
  anyone reusing this bundle template starts from a taxonomy that fits their own work.
```

`<MINDBASE_ROOT>/knowledge/log.md`:
```markdown
# Directory Update Log

## <TODAY, YYYY-MM-DD>
* **Creation**: Bootstrapped the bundle for the <persona> persona — root index.md,
  README.md, <N> domain folders (<list>), Obsidian graph-view config. No concepts
  captured yet.
```

Write an empty stub `index.md` in each chosen folder, e.g. for a folder named `cases/`:
```markdown
# Cases

<One-line purpose from the preset, or user-provided description for custom folders.>
Recommended frontmatter `type: Case` (singularized, capitalized folder name, unless the
user specifies otherwise).

(No concepts captured yet — run brain-capture to add the first one.)
```

## Step 4 — Write .obsidian/ config

`<MINDBASE_ROOT>/knowledge/.obsidian/app.json` and `appearance.json`: `{}`

`<MINDBASE_ROOT>/knowledge/.obsidian/core-plugins.json`:
```json
{
  "file-explorer": true, "global-search": true, "switcher": true, "graph": true,
  "backlink": true, "canvas": true, "outgoing-link": true, "tag-pane": true,
  "footnotes": false, "properties": true, "page-preview": true, "daily-notes": false,
  "templates": false, "note-composer": true, "command-palette": true,
  "slash-command": false, "editor-status": true, "bookmarks": true,
  "markdown-importer": false, "zk-prefixer": false, "random-note": false,
  "outline": true, "word-count": true, "slides": false, "audio-recorder": false,
  "workspaces": false, "file-recovery": true, "publish": false, "sync": false,
  "bases": true, "webviewer": false
}
```

`<MINDBASE_ROOT>/knowledge/.obsidian/graph.json` — `colorGroups` built by walking the
chosen folders **in the order the user picked them** against this shared 12-color
palette:

| # | Name | Hex | Decimal RGB |
|---|---|---|---|
| 1 | Blue | `#4a9eed` | 4890349 |
| 2 | Green | `#22c55e` | 2278750 |
| 3 | Purple | `#8b5cf6` | 9133302 |
| 4 | Amber | `#f59e0b` | 16096779 |
| 5 | Orange | `#f97316` | 16347926 |
| 6 | Cyan | `#06b6d4` | 440020 |
| 7 | Pink | `#ec4899` | 15480985 |
| 8 | Red | `#ef4444` | 15680580 |
| 9 | Teal | `#14b8a6` | 1357990 |
| 10 | Yellow | `#eab308` | 15381256 |
| 11 | Indigo | `#6366f1` | 6514417 |
| 12 | Gray | `#6b7280` | 7041664 |

If more than 12 folders are ever needed, derive a new decimal value from any hex color
via `R*65536 + G*256 + B` instead of extending this table indefinitely.

```json
{
  "collapse-filter": false,
  "search": "",
  "showTags": true,
  "showAttachments": false,
  "hideUnresolved": false,
  "showOrphans": true,
  "collapse-color-groups": false,
  "colorGroups": [
    { "query": "path:<folder-1>/", "color": { "a": 1, "rgb": <palette[1]> } },
    { "query": "path:<folder-2>/", "color": { "a": 1, "rgb": <palette[2]> } }
  ],
  "collapse-display": false,
  "showArrow": true,
  "textFadeMultiplier": 0,
  "nodeSizeMultiplier": 1.3,
  "lineSizeMultiplier": 1.2,
  "collapse-forces": false,
  "centerStrength": 0.518713248970312,
  "repelStrength": 10,
  "linkStrength": 1,
  "linkDistance": 300,
  "scale": 0.6635532333438541,
  "close": false
}
```

> If `.obsidian/` already exists (vault already opened once in Obsidian), read the
> existing file first and merge `colorGroups` in — don't clobber `scale`,
> `centerStrength`, `repelStrength`, which Obsidian rewrites as the user pans/zooms.

## Step 5 — Write skills to .agents/, and Claude Code commands

Copy these four skill folders verbatim into `<MINDBASE_ROOT>/.agents/`, each containing
its `SKILL.md`:
1. `brain-capture/`
2. `brain-query/`
3. `brain-maintain/`
4. `brain-setup/` (this skill, so the new workspace can bootstrap further ones)

They already reference the bundle as a relative concept (`knowledge/` under the
workspace root) and discover the live folder set from `knowledge/index.md` rather than
assuming a fixed one — no path substitution needed beyond `<MINDBASE_ROOT>` if a file
hardcodes a different root.

Also write four thin wrapper files to `<MINDBASE_ROOT>/.claude/commands/` so
`/brain-setup`, `/brain-capture`, `/brain-query`, `/brain-maintain` work natively in
Claude Code without any manual copying. Same template for all four, only the skill name
changes:

```markdown
---
description: <one-line purpose, matching the skill's row in the Skills table>
---

Read and follow `.agents/<skill-name>/SKILL.md` in full, then execute it, treating
everything below this line as its `$ARGUMENTS`:

$ARGUMENTS
```

This keeps `.agents/` as the single source of truth — the wrapper never duplicates skill
logic, so future edits to a skill only need to happen in one place. Skills are plain
markdown with no vendor lock-in, so the same wrapper pattern also works for other
agent tools (e.g. `.cursor/commands/`, `.github/prompts/*.prompt.md`) — see the
top-level `README.md`'s "Using these skills in other tools" section; only do this for
tools the user actually mentions using.

## Step 6 — Write the workspace README.md (top-level, architecture doc)

```markdown
# <Bundle Title> — Knowledge Bundle

**Owner**: <NAME>
**Persona**: <persona chosen in Step 1>
**Created**: <TODAY>
**Format**: [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

## Skills (.agents/)

| Skill | Purpose |
|---|---|
| brain-capture | Extract and save knowledge as OKF concepts; grows new folders organically |
| brain-query | Search, explore, path, timeline, tags, summary |
| brain-maintain | Health check, merge, enrich, reorganize, taxonomy review |
| brain-setup | Bootstrap a new Mindbase workspace (persona-driven folder picker) |

The canonical copy of each skill lives under `.agents/<skill-name>/SKILL.md`;
`.claude/commands/` ships thin wrappers pointing back to them, so `/brain-capture` etc.
already work natively in Claude Code. These are plain markdown prompts with no vendor
lock-in — the same wrapper pattern works for other agent tools too (Cursor's
`.cursor/commands/`, GitHub Copilot's `.github/prompts/*.prompt.md`), or just paste a
skill file's content into any chat/agent as your prompt.

## Domains

<one row per chosen folder: `| <folder>/ | <color name> | <recommended type> |`>

Folders are a convenience, not a schema — see `knowledge/README.md` for how this
taxonomy can evolve.

## Obsidian

Open `knowledge/` as an Obsidian vault. Graph view (Ctrl/Cmd+G) is pre-colored by
domain folder. Relationships are plain markdown links inside each concept's `## Related`
section — Obsidian renders these as graph edges automatically.
```

## Step 7 — Final verification checklist

- [ ] `knowledge/index.md` exists with `okf_version: "0.2"` frontmatter, linking every
      chosen folder plus `README.md` and `log.md`
- [ ] `knowledge/README.md` exists with `type: Documentation` frontmatter
- [ ] `knowledge/log.md` exists with a creation entry naming the persona and folder list
- [ ] Every chosen folder exists with an `index.md` stub
- [ ] `knowledge/.obsidian/graph.json` has one colorGroup per chosen folder
- [ ] `.agents/` contains all 4 skill folders, each with a `SKILL.md`
- [ ] `.claude/commands/` contains all 4 wrapper files, each pointing to its
      `.agents/<skill-name>/SKILL.md` counterpart
- [ ] Workspace `README.md` exists and lists the actual chosen folders (not a fixed set)

Then instruct the user:
1. **Open Obsidian** → "Open folder as vault" → select `<MINDBASE_ROOT>/knowledge/`
2. **Open Claude Code** with `<MINDBASE_ROOT>/` as the project root
3. **First capture**: run brain-capture with something like "I just set up Mindbase"
4. If the `okf` plugin is installed, validate the bundle:
   `uv run <okf-plugin-path>/skills/validate/scripts/okf_validate.py <MINDBASE_ROOT>/knowledge --strict`

## Notes for the assistant

- Use the Bash tool for directory creation; on Windows/Git Bash use forward-slash paths
  (`/d/MyMindbase/...` not `D:\MyMindbase\...`)
- Confirm with the user before overwriting an existing `knowledge/` that already has
  captured concepts
- Never write a concept file without a `type` — that's the one OKF hard-conformance rule
- Never assume the 7-folder software-engineering layout is "the" default — it's one
  preset among several, and the generic/custom paths are equally first-class

**Setup arguments from user:**
$ARGUMENTS
