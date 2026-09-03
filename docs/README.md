# Mindbase — Architecture Diagram & Interactive Overview

## Supporting docs

The root `README.md` stays focused on installing and using Mindbase; the reasoning,
backstory, and comparisons live here instead:

- [`why-mindbase.md`](why-mindbase.md) — where the idea comes from, the problem it
  solves, and using it beyond work
- [`design.md`](design.md) — why it's dependency-free and built to be tweaked
- [`comparisons.md`](comparisons.md) — how it differs from code-graph tools and an
  agent's built-in memory

## Interactive overview

[`index.html`](index.html) is a self-contained, dependency-free landing page for
Mindbase — an animated knowledge-graph hero, the "why", vault composition examples,
the four skills, an architecture flow diagram, and copy-paste "get started" steps. It's
meant to be published via **GitHub Pages** and linked from the top-level `README.md`.

**Enabling it on your own fork/clone:**

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Set **Branch** to `main` and the folder to **`/docs`**, then save.
5. GitHub publishes it at `https://<your-username>.github.io/<repo-name>/` within a
   minute or two.
6. Update the placeholder link at the top of the root `README.md` with that URL.

No build step is required — `index.html` is plain HTML/CSS/JS.

## Architecture diagram

[`architecture.drawio`](architecture.drawio) (draw.io) is a diagram showing how the
pieces of this repo fit together:

- The agent tools that can drive it (Claude Code, Cursor, GitHub Copilot, or any other
  agent/chat interface).
- How each one reaches the canonical skills in `skills/` — natively via
  `.claude/commands/` for Claude Code, via an equivalent wrapper for other tools, or by
  pasting a skill file's content directly.
- How every skill in `skills/` reads and conforms to the OKF v0.2 specification
  directly — it's the external, canonical source of the frontmatter/file rules the
  skills implement.
- What each of the four skills (`brain-setup`, `brain-capture`, `brain-query`,
  `brain-maintain`) does to the `knowledge/` bundle.
- How `knowledge/` itself is laid out (`index.md`, `README.md`, `log.md`, the
  `concepts/` seed folder, dynamically-created domain folders, and the Obsidian
  `.obsidian/graph.json` color config), and how Obsidian opens it as a vault.

## Opening it

- **draw.io / diagrams.net**: open [diagrams.net](https://app.diagrams.net/) → "Open
  Existing Diagram" → select `architecture.drawio`.
- **VS Code**: install the "Draw.io Integration" extension, then open
  `architecture.drawio` directly — it renders and edits in-editor.
- **Editing**: keep the diagram in sync with `skills/*/SKILL.md` and the top-level
  `README.md` when the architecture changes (new skill, new wrapper tool, new
  bundle-level file, etc.).
