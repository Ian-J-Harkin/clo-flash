# Project Breadcrumb: Cló-Flash

## Current Status (2026-04-03)
The Cló-Flash prototype has a functional 2-Gate learning loop using Svelte 5 Runes. Gates 1 (Basics) and 2 (Lookalikes) are complete and tested.

## Core Technical Breadcrumbs
- **Framework**: Svelte 5 (Runes) for reactive state.
- **Styling**: Tailwind 4.0 + Custom CSS in `src/app.css` for dyslexia-friendly "Cream" theme.
- **Font**: **Bunchló GC** (`bungc.otf`). Link: `static/fonts/bungc.otf`.
- **Game Engine**: `src/lib/useGame.svelte.js` (Class-based rune state).
- **Data**: `src/lib/data.json` contains curated Cló Gaelach vocabulary.

## Educational Design Decisions (Developmental Editor)
- **Ghost Trace**: A semi-transparent correction layer appears over the user's incorrect choice.
- **Visual Anchoring**: Subtle 4s pulse on discriminating features (bars/curves) to help visual fixation.
- **Audio Link**: Integrated placeholder hook for future phonetic reinforcement.

## Next Milestone (Locked)
- **Gate 3: The Séimhiú**: Implementation of dotted consonants vs. plain consonants logic.

## Launch Instruction
Run `npm run dev` to start the local laboratory.
