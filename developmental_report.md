# Developmental Report: Cló-Flash PoC Refinements

## 1. Linguistic Integrity (Gate 1 Audit)
- **Correction**: Initial placeholder `lam` was updated to **`láṁ`** (dotted `ṁ`).
- **Justification**: Modern 'h' suffixes (`lámh`) are avoided to leverage the Bunchló font's native Unicode support for dotted consonants (`séimhiú`).
- **Accents**: Applied required fadas to *mála*, *fás*, and *fíor* to ensure correct pronunciation and orthographical validity.

## 2. The f/s Discrimination Hurdle (Gate 2)
- **Observation**: The `fíor` / `síor` challenge was identified as a major friction point due to the visual similarity of characters in Cló Gaelach.
- **Linguistic Insight**: The distinction relies entirely on a single horizontal stroke (*An Trasnán*).
- **Instructional Feedback (The "Fix")**:
    - **f-Hint**: Orange bar animation triggered on error.
    - **s-Hint**: Orange bottom-curve animation to emphasize the lack of a bar.
    - **Contextual Labels**: Integrated Irish terminology ("An Trasnán") into the feedback loop.

## 3. Technical Stack Review
- **Framework**: Svelte 5 (Runes) is effectively managing the game state transitions.
- **Font**: Correctly configured `bungc.otf` in `app.css`.
- **Latency**: Interaction feels immediate, critical for a flashcard-based game loop.

## 4. UX and Onboarding Enhancements
- **Loading Sequence & "Splash"**: A premium loading spinner ensures the DOM and fonts are fully painted before transitioning.
- **Multi-Slide Walkthrough**: Added an orientation phase summarizing the application's underlying visual pedagogy. This helps frame the "game" as an educational tool.
- **Interactive Turorial**: Embedded a functional mockup of the flashcard mechanics directly inside the walkthrough to teach the feedback loop prior to starting the game.
- **State Machine Refactor**: Migrated from simple boolean toggles (`isGameStarted`) to an explicit screen state machine (`currentScreen: 'LOADING' | 'ONBOARDING' | 'WELCOME' | 'GAME' | ...`) for maintainable routing in a single-page context.
