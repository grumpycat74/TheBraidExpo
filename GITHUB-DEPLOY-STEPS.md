# Deploy The Braid Expo to GitHub Pages

Your site is a React app — the `.tsx` files are components, not web pages. They must be
**built** (compiled) into HTML/CSS/JS. You don't need to do that on your computer:
the workflow file I added (`.github/workflows/deploy.yml`) makes GitHub build and
publish the site automatically every time you push.

## One-time setup

1. **Push this folder to your repo** (the one named `YOURUSERNAME.github.io`).
   Easiest way without the command line: GitHub Desktop app, or on github.com go to
   your repo → **Add file → Upload files** → drag in everything inside `Lovable_Website`
   (make sure the hidden `.github` folder is included — GitHub Desktop handles this
   automatically; the web uploader does not upload hidden folders, so GitHub Desktop
   or `git` is recommended).

   Command line version:
   ```
   cd Lovable_Website
   git init
   git add .
   git commit -m "Braid Expo site"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git
   git push -u origin main
   ```

2. **Turn on GitHub Pages**: on github.com, open the repo →
   **Settings → Pages → Build and deployment → Source → GitHub Actions**.

3. Go to the **Actions** tab. You'll see "Build and Deploy to GitHub Pages" running.
   When it turns green (2–4 minutes), your site is live at
   `https://YOURUSERNAME.github.io`.

## After that

Any time you push a change to `main`, the site rebuilds and republishes itself.

## Notes

- Do **not** rename `.tsx` files to `.html` — that will break the build.
- The build prerenders every page (Home, Services, Shop, Lookbook, About,
  Booth Rental, Apply, Cart, Checkout, Contact, Policies, confirmations) into
  real HTML files, plus a `404.html` fallback so in-site navigation works.
- If the Actions run fails, open the failed step's log and send it to me —
  I'll fix it.
