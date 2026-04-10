# Cló-Flash Project Waypoints

## Status Summary: **STABLE PROTOTYPE (PHASE 2 COMPLETE)**
The Cló-Flash educational prototype is fully functional, verified by unit tests, and optimized for high-intensity visual discrimination training.

---

### ✅ COMPLETED WAYPOINTS
- [x] **Core Svelte 5 Engine**: Implemented `useGame.svelte.js` with reactive state.
- [x] **Pedagogical Scaffolding**: 
    - [x] **Ghost Trace**: Visual correction hint.
    - [x] **Bionic Reading**: Fixation point bolding.
    - [x] **Visual Anchoring**: Subtle pulses on discriminatory features (An Trasnán).
- [x] **2-Gate Learning Loop**: 
    - [x] Gate 1: Basics (a, m, g, l).
    - [x] Gate 2: Lookalikes (f/s, r/n).
- [x] **"Evil Twins" Boss Mode**:
    - [x] 20 rapid-fire cards with a shrinking time limit.
    - [x] "Get Ready" instructions & Progress tracking (Y/20).
- [x] **UI/UX Optimization**: 
    - [x] **Randomized buttons**: Fixed predictable layout bug.
    - [x] **High-Economy Vertical View**: Fits laptops/mobiles without scrolling.
    - [x] **Welcome Screen**: Visual demos for f/s shapes.
- [x] **Asset Optimization**: 
    - [x] Integrated WOFF2 fonts (bungc, bundgc) for performance.
- [x] **Verification & Documentation**:
    - [x] 100% test coverage for game engine state transitions.
    - [x] Comprehensive `user_guide.md` and `manual_testing_guide.md`.

---

### 🚀 DEPLOYMENT WAYPOINTS (NEW)
- [ ] **Instrument for GitHub**: Finalize `README.md` and repo structure.
- [ ] **Deployment Prep**: Choose a static provider (Vercel/Netlify recommended).
- [ ] **Live Launch**: Synchronize the `static/fonts` for web-ready delivery.
- [ ] **Final QA**: Verify font rendering and audio placeholders on the live URL.
- [ ] **Pedagogical Polish (Future)**: Integrate Abair.ie phonetic audio API.

---

### 🎨 UI/UX & ONBOARDING (CURRENT SPRINT)
- [x] **Loading Sequence**: Implement a polished loading screen with a high-impact title and CSS animations.
- [x] **Application Orientation**: Create a multi-slide walkthrough (based on `README.md`) explaining the "Two-Gate" learning methodology.
- [x] **Interactive Tutorial**: Interactive demo screen showing how the flashcard mechanics (choice selection, feedback) function.
- [x] **Progress Scope Indicator**: Persistent "Screen X of Y" or progress bar to orient the user within the learning sequence.

---

### 📝 NOTES
- Current build uses `@sveltejs/adapter-auto`.
- Local tests: `npx vitest run src/lib/useGame.test.js` (ALL PASS).
- Fonts: Ensure `bundgc.woff2` and `bungc.woff2` are correctly served from `/fonts/`.
