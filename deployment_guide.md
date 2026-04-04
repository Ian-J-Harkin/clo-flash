# Deployment Guide: Live Launch for Cló-Flash

Use this guide to host your Irish Orthography Lab for free on the public web.

## 🏆 Recommendation: Vercel (Easiest)
Because Cló-Flash uses **SvelteKit**, Vercel provides a native, zero-configuration deployment experience.

1. **Push to GitHub**: Ensure your project is in a GitHub repository.
2. **Import to Vercel**: Sign in to [Vercel](https://vercel.com) and click **"Add New" -> "Project"**.
3. **Select Repository**: Pick your `clo-flash` repo.
4. **Deploy**: Leave all settings at their defaults. Vercel will auto-detect the Svelte framework and deploy it in under a minute.
5. **Fonts check**: Ensure the script renders correctly on the live URL. If it doesn't, double-check that your `static/fonts` folder was included in the GitHub push.

---

## ⚡ Option 2: Netlify
Netlify also supports SvelteKit out of the box with `@sveltejs/adapter-auto`.

1. **Connect GitHub**: Log in to [Netlify](https://netlify.com) and **"Import from GitHub"**.
2. **Build Settings**: 
   - Build Command: `npm run build`
   - Publish directory: `.svelte-kit/output` (or just leave blank for auto-detection).
3. **Deploy Site**: Click the deploy button.

---

## 🐙 Option 3: GitHub Pages
GitHub Pages requires **Static Site Generation (SSG)**. To use this, you would need to swap the adapter in `svelte.config.js`.

1. **Install Adapter**:
   ```bash
   npm install -D @sveltejs/adapter-static
   ```
2. **Update Config**: Change `adapter-auto` to `adapter-static` in `svelte.config.js`.
3. **Add .nojekyll**: Create an empty file named `.nojekyll` in the `static/` folder (GitHub Pages ignores folders starting with an underscore, like `_app`, unless this file is present).
4. **GitHub Action**: Use the "SvelteKit GitHub Pages" action template in your repository's **Settings -> Pages** tab.

---

## 🛠️ Post-Deployment Checklist
- [ ] **Font Rendering**: Verify that the script looks like the traditional typeface and not standard Roman letters.
- [ ] **Mobile Layout**: Check your phone browser to ensure the "High-Economy" layout fits without scrolling.
- [ ] **Performance**: Ensure the "Evil Twins" timer is smooth (server-less environments shouldn't affect the client-side JS timer).
- [ ] **Audio**: Note that the phonetic audio hooks remain placeholders until a real API (like Abair.ie) is integrated.

---
*Manannán Digitization Lab | Launch Phase Waypoints*
