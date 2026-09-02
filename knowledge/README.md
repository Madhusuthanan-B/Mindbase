---
type: Documentation
title: About This Bundle
description: How this Mindbase bundle is organized and how to grow it
tags:
  - meta
  - taxonomy
generated:
  by: claude-code/brain-setup
  at: 2026-09-02T00:00:00Z
status: stable
---

# About This Bundle

This is an [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
knowledge bundle. It ships in a deliberately **minimal, unbootstrapped state** — one
seed folder and nothing persona-specific — so it fits anyone who clones it, not just the
person who set it up first.

## Current domains

- **`concepts/`** — the one universal catch-all folder. Every Mindbase bundle has this
  folder; everything else is added for your own domain.

## Bootstrapping folders for your domain

Run the `brain-setup` skill (`.agents/brain-setup/SKILL.md`) and answer its persona question.
It offers a growing list of starter presets — software engineering, medicine, finance,
law, product, marketing, HR, education, consulting, design, personal life admin, a fully
generic set, and more (see that file for the current full list) — and will create
matching folders, `index.md` stubs, and Obsidian graph colors for whichever one fits you
(or a custom list you type yourself). None of these presets are "the" default; pick
whatever matches how you actually think about your own knowledge.

## Growing this bundle over time

- Folders here are a convenience for organization and Obsidian coloring, not a schema —
  OKF itself doesn't enforce any taxonomy.
- New domain folders can appear **organically**: when `brain-capture` (`.agents/
  brain-capture/SKILL.md`) encounters a concept that doesn't fit any existing folder, it
  will propose creating a new one (with your confirmation) rather than forcing a bad fit.
- Run `brain-maintain` (`.agents/brain-maintain/SKILL.md`, `reorganize` mode) occasionally —
  it includes a taxonomy review that flags folders that have gone near-empty, folders
  that have grown large and topically mixed, and leftover Obsidian color entries with no
  matching folder, and suggests merges/splits/cleanup.
- Cloned this repo as a template for someone else? Re-running `brain-setup` on the fresh
  clone offers the same persona picker, so they start from a taxonomy that fits their
  own work instead of inheriting yours.
