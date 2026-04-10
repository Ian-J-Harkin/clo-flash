# User Guide: Cló-Flash PoC

Welcome to the Cló-Flash laboratory! This application is a gamified, dyslexia-friendly tool for mastering traditional Irish script (Cló Gaelach).

## How to Play
1. **The Orientation**: When you first load the lab, you will experience an interactive 3-slide walkthrough. This explains the specific challenges of Traditional Irish Script, highlights "discriminating features", and provides an interactive tutorial on feedback mechanics.
2. **The Word View**: Once you start your training, you will see an Irish word in the traditional script with one character missing (marked with a **?**).
3. **The Choice**: Two buttons at the bottom offer options. Choose the correct character to complete the word. You can also track your progress via the "Screen X of Y" scope indicator at the top of the interface.
3. **The Gates**:
    - **Gate 1 (Basics)**: High-contrast shapes like `a`, `m`, `g`, and `l`.
    - **Gate 2 (Lookalikes)**: Specifically targets common visual confusion in the script, like `f` vs. `s`.
4. **"Evil Twins" Boss Mode**: A high-speed fluency challenge unlocked after Gate 2. You must complete 20 cards in rapid succession as your time limit shrinks!

## Pedagogical Features
We’ve integrated several "scaffolding" techniques designed for visual learners and dyslexic users:

- **Ghost Trace Hint**: If you make a mistake, a semi-transparent version of the correct character appears behind the question mark for instant, non-punitive visual correction.
- **Visual Anchoring**: The "discriminating feature" (like the bar on the `f`) subtly pulses every 4 seconds to assist visual fixation.
- **Bionic Reading**: Segmented words have bolded fixation points (the first 1-2 characters) to help with eye tracking.
- **Speed Bar (Boss Mode)**: A red countdown bar at the top of the card that shrinks in real-time, building rapid identification fluency.

## Developer & Lab Operations
- **Launch**: Run `npm run dev` to start the local dev server.
- **Tests**: Our game logic is verified via Vitest. Run the unit tests with:
  ```bash
  npx vitest run src/lib/useGame.test.js
  ```
- **Data Pool**: You can modify or expand the vocabulary in `src/lib/data.json`.
- **Breadcrumb**: See `.agent/rules/system-goals.md` for the technical and pedagogical state-of-play.
