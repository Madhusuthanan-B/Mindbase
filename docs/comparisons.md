# How Mindbase compares to other tools

## Code-graph tools

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

## An agent's built-in memory

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

See also: [Why Mindbase](why-mindbase.md), [Design choices](design.md).
