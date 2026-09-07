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

## Agent memory — built-in, or bolted on

Some agent platforms now ship memory as a built-in feature, letting an agent maintain
its own context file across sessions so it doesn't lose the plot on a long task. A
growing ecosystem of open-source memory servers does something similar from the
outside — different tools, different storage underneath (some vector-backed, some
local SQLite/full-text search, some plain markdown) — but almost all of them scoped to
one codebase or one agent's own sessions, built to make that agent's own recall cheaper
and faster, not to give a human something to read. It's fair to ask whether Mindbase is
reinventing that. It isn't — they solve different problems:

- **Scope: a vault you carry, not a project cache.** Most agent memory — built-in or
  bolted on — is scoped to one tool's sessions or one codebase. A Mindbase vault spans
  whatever domains you want — work, finance, health, anything — plain markdown any
  agent, or you, can open next week whether or not it's this week's tool.
- **Audience: built for you, not just the agent.** Even memory tools with a graph or
  index underneath build it to make the agent's own recall faster and cheaper.
  Mindbase's graph exists so *you* can browse, query, and learn from it directly — the
  agent is a contributor, not the only reader.
- **Ownership: yours to curate, not invisible.** Agent memory isn't meant to be
  browsed — you'd have to ask the agent for it back. A Mindbase vault is meant to be
  opened, edited, and curated directly, in Obsidian or any text editor, with the agent
  contributing to it rather than owning it.

Honestly, the right answer depends on what you're trying to do and how complex it is.
If the problem is "my agent forgets mid-task," a purpose-built memory layer is the
right tool for that job — use it, that's a good outcome, not a threat. If the problem
is "I want a knowledge base I can browse, curate, and learn from myself, across
whatever I'm working on," that's a different job — the one Mindbase is built for: an
open format, portable across whatever agent you use, readable without one in the loop
at all, with a human still deciding what's worth recording instead of an agent
capturing everything on your behalf.

See also: [Why Mindbase](why-mindbase.md), [Design choices](design.md).
