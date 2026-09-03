# Design choices

Why Mindbase is built the way it is.

## Make it yours

Mindbase is intentionally minimal — tweak the folders, colors, frontmatter fields, and
skill prompts to fit your own workflow. The folder taxonomy in particular is not fixed:
it's persona-driven at setup and can keep evolving afterward (see "Domains" in the
[README](../README.md#domains)), so the same tool works whether you're tracking client
contracts, medical cases, or code decisions, without forcing your work into someone
else's template.

## Dependency-free by design

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

See also: [Why Mindbase](why-mindbase.md), [How Mindbase compares to other tools](comparisons.md).
