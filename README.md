# Cló-Flash: Traditional Irish Orthography Lab

**Cló-Flash** is an educational Svelte 5 prototype designed to teach users how to read the **Traditional Irish Script** (*Cló Gaelach*). Specializing in **Visual Discrimination**, it uses sophisticated pedagogical "scaffolding" to help users master the subtle differences between similar characters like `f` and `s`.

---

## 🇮🇪 Project Pedagogy
Traditional Irish typefaces are beautiful but "deceptively simple." Many letters look nearly identical—the secret is in discriminating between fine visual features (like the *Trasnán* or crossbar on `f`). This app targets these specific "pain points."

### ✨ Dyslexia-Friendly Scaffolding
- **Ghost Trace Hint**: Immediate, non-punitive visual correction.
- **Bionic Reading**: Fixation points (bolded text) to assist with rapid eye tracking.
- **Visual Anchoring**: Subtle pulses on "discriminating features" to guide your focus.
- **Evil Twins (Boss Mode)**: A high-stakes, 20-card gauntlet with a shrinking timer to move from identification to true fluency.

---

## 🛠️ Technical Implementation
- **Framework**: Svelte 5 (Runes) & SvelteKit.
- **Styling**: Tailwind CSS 4.0 for high-economy, mobile-responsive design.
- **Fonts**: **Bunchló Ársa GC** (WOFF2 format) for high-performance script rendering.
- **Engine**: A custom `GameEngine` proxy class with automated difficulty ramping.

---

## 🚀 Speed-Start for Lab Assistants
### 1. Installation
```bash
npm install
```

### 2. Development
Launch the interactive lab:
```bash
npm run dev
```

### 3. Logic Verification
Run the Vitest suite to verify game engine transitions:
```bash
npx vitest run src/lib/useGame.test.js
```

---

## 🏗️ Folder Structure
- `src/lib/useGame.svelte.js`: The central "Brain" of the game.
- `src/lib/Flashcard.svelte`: The high-fidelity Irish card component.
- `static/fonts/`: Essential WOFF2 assets (don't forget these during deployment!).
- `src/lib/data.json`: Curated vocabulary and lookalike pair pools.

---

## 📦 Deployment Waypoints
For free hosting with zero-config, we recommend **Vercel** or **Netlify**.

1. Connect your repository to **Vercel**.
2. Vercel will auto-detect the SvelteKit framework.
3. Deploy!

For advanced hosting (GitHub Pages, etc.), see the [Deployment Guide](./deployment_guide.md).
