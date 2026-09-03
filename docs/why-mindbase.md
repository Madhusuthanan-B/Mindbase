# Why Mindbase

The reasoning and backstory behind Mindbase.

## Where the idea comes from

We've always talked about knowledge in the shape of branches and trees — "a branch of
science", a family tree, a decision tree. The oldest known attempt to actually draw this
out is the <a href="https://www.quora.com/What-is-a-porphyrian-tree" target="_blank" rel="noopener">**Porphyrian Tree**</a>, sketched by the philosopher Porphyry in the 3rd century AD
as a commentary on Aristotle — the first known branching diagram used to classify
concepts, splitting broad categories into narrower and narrower ones. Mindbase runs on
that same instinct, made practical.

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

Installed the [Claude Code plugin](../README.md#install) instead of cloning? Same idea, no
cloning needed — a "vault" is just whichever project folder you currently have open, so
`mindbase-work`, `mindbase-finance`, etc. become project folders you switch between
instead of separate clones.

See also: [Design choices](design.md), [How Mindbase compares to other tools](comparisons.md).
