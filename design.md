I’ve updated the design to reflect our move to Svelte 5 and Google Antigravity. In the 2026 Antigravity environment, "Skills" and "Rules" are the primary ways to guide an agent. Instead of a single long prompt, Antigravity works best when you provide a structured Project Blueprint that the agent can "ingest" to create its own implementation plan.

For the font, I've selected Bunchló Ársa GC as the primary open-source recommendation. It is a high-quality Unicode-compliant font that handles the Séimhiú (dotted consonants) perfectly, which is critical for our "Gate 3" requirements.

Google Antigravity PoC Specification
Project Name: clo-flash-poc
Framework: Svelte 5 (Runes-mode)
Primary Font: Bunchló Ársa GC (Open Source / Unicode)

1. Workspace Configuration (.agent/rules/system-goals.md)
Markdown
# Project Rules: Cló-Flash
- **Framework**: Use Svelte 5 with Runes ($state, $derived, $effect).
- **Styling**: Tailwind CSS 4.0+.
- **A11y**: Follow Dyslexia-friendly guidelines (Cream background #FFFDD0, high-contrast text, 1.5 line spacing).
- **Architecture**: Modular components. Separate game logic from UI rendering.
2. Implementation Plan: The "Learning Loop"
Goal: Create a 2-Gate functional prototype.

Gate 1: The Basics (Distinct Shapes)
Characters: a, m, g, l

Logic: Simple identification.

Gate 2: The Lookalikes (Discriminatory Training)
Characters: f (cross-bar) vs. s (open bottom), r vs. n.

Feature: If a user selects 's' for a word starting with 'f', trigger a Stroke Highlight.

3. Skill Definition: game-engine-skill
Agent Instruction: "Create a useGame.svelte.js module using Svelte Runes. It must track currentGate, score, and lives. If a user makes a mistake, the isHintVisible state should toggle to true, triggering a CSS animation on the target letter's specific SVG stroke."

Instructions for Antigravity Agent
Copy and paste the following into your Antigravity Chat:

"Agent, initialize a new Svelte 5 project named clo-flash.

Setup Assets: Download and subset the 'Bunchló Ársa GC' font. Store it in /static/fonts.

Data Structure: Create a src/lib/data.json containing 10 words for 'Gate 1' and 'Gate 2'. Use the 'f/s' lookalike pair as the primary challenge for Gate 2.

UI Development: Build a Flashcard.svelte component. Use a soft cream background (#FFFDD0). The word should be displayed in Cló Gaelach with a missing letter.

Interaction: Provide two large buttons for the choice. On a wrong answer, shake the card and highlight the missing letter's 'discriminating feature' (e.g., the horizontal bar on the 'f') in orange.

Gamification: Implement a simple progress bar that unlocks Gate 2 after 5 correct answers."

Architect's Final Note on Phase 1
By using Svelte 5 Runes, the agent will write much cleaner code than in older versions of React or Svelte. The $state and $derived patterns are perfect for a game where the UI needs to react instantly to a "Life" being lost or a "Hint" being triggered.

>>>   EXTRAS
This is a brilliant set of observations. You’ve correctly identified a "gap" in the market: while there are tools for typing or translating into Cló Gaelach, there isn't a dedicated, gamified learning path that treats the script like a visual puzzle—which is exactly why your idea has such strong "viral" potential.

Here is my architectural assessment of your ideas and how they integrate into our Cló-Flash spec:

1. Assessment of Existing Tools
Seanchló Typer / Seanchló App (Peter Elst): These are fantastic "utility" apps. They are great for people who already know what they are looking at. However, for a beginner or a dyslexic learner, they are "passive"—they don't correct you or teach you the why.

Anki: Powerful, but as you noted, the UI is "stuck in 2012." It requires the user to do the hard work of building the deck.

Your Opportunity: Cló-Flash takes the science of Anki (Spaced Repetition) and the utility of Seanchló Typer, but adds the Active Scaffolding (the "f vs s" challenge) that is currently missing.

2. Feasibility of "Dyslexia-Friendly" Tech
Your suggestion to mirror dyslexia-friendly techniques is not only feasible but is actually the Core Competitive Advantage of this app.

Technique	Feasibility	Implementation in Cló-Flash
Multisensory Tracing	High	Using Svelte's SVG capabilities, we can animate the "stroke order" so the user sees the letter being drawn before they have to identify it.
Color-Coded Phonemes	High	We can highlight the Séimhiú (the dot) in a consistent color (e.g., "Ponc Orange") to help the eye "anchor" on the modification.
Bionic Reading	High	Highlighting the first few characters of a word in a slightly bolder weight to help with visual fixation and tracking.
Chunking	High	This is our "Gate System." We don't show the whole alphabet; we show 4 letters that are visually distinct, then 4 that are "lookalikes."
3. Revised "Master Architect" Recommendations
Based on your research, here are three high-value features we should add to the Antigravity Spec:

A. The "Ghost Trace" Hint
Instead of just showing an orange highlight on a mistake, the app should "draw" the correct letter in a semi-transparent "ghost" layer over the user's incorrect choice. This provides immediate visual correction—a classic dyslexia intervention.

B. Audio Reinforcement (Abair.ie Integration)
You mentioned Abair.ie in your research. In 2026, their API is world-class.

Feature: When a card is flipped, the app should play the high-quality synthetic audio of the word. Hearing "f-ear" while seeing the distinct f helps wire the visual-to-auditory connection.

C. "Lookalike" Pair Training (The "Evil Twins" Mode)
We should create a specific "Boss Level" for each gate that specifically forces the user to choose between the 2 most confused letters (f/s, r/n, a/o) 20 times in a row with increasing speed. This is "Fluency Training."

4. Updated Project Blueprint for Antigravity
If you are ready to have the Agent build the PoC, add this "Pedagogical Layer" to the prompt:

Agent Skill Addendum: Dyslexia-Support

Visual Anchoring: Implement a 'Focus Mode' where the 'discriminating feature' of a letter (like the bar on the 'f') has a subtle pulse animation every 3 seconds.

Audio Link: Use a placeholder audio function playPhonetic() that triggers on card flip.

Chunked Review: Implement a 're-test' loop for any letter missed more than twice in a single session.

Architect's Advice: Don't worry about competing with Anki or Duolingo. They are "Generalists." Your project is a "Specialist" tool. People will use it for 2 weeks to "unlock" a new skill, share their results on social media, and then move on. That is the perfect lifecycle for a viral web app.

Should we proceed with generating the final JSON data structure for these "Lookalike" pairs? This will give the Antigravity agent the exact "distractor" logic it needs.