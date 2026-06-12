# Cheeky Links Social Club

> Folder is still named `back-nine-greens-club` (the original working name) — the brand was renamed to **Cheeky Links Social Club**. The directory name is cosmetic; everything user-facing uses the new name.

A premium, country-club-meets-cannabis brand site — a single-page lookbook for a cannabis **+** apparel lifestyle brand (think Cookies / STIIIZY, but private-members-club energy).

Built as plain **HTML + CSS + JavaScript**. No build step, no frameworks, no dependencies. If you can open a file, you can run this.

---

## How to see it

**Option A — just double-click**
Open `index.html` in your browser. Done.

**Option B — run the local server (recommended; lets you view on your phone too)**
```powershell
cd C:\Users\Owner\back-nine-greens-club
node serve.js
```
Then open **http://localhost:8099**. The terminal also prints a `Network` URL — open that on your phone (same Wi-Fi) to see the mobile layout.

---

## What's in here

| File | What it does |
|------|--------------|
| `index.html` | All the content and structure (the sections) |
| `styles.css` | All the styling — colors, fonts, layout, animations |
| `script.js`  | The age gate, menus, scroll animations, and the email form |
| `serve.js`   | A tiny local web server so you can preview it |
| `assets/`    | The real logo (`cheeky-links-logo.webp` for the site, `.png` for sharing/merch) + `favicon.png` (rabbit crop) |

## The sections (golf ↔ greens wordplay throughout)

1. **Age gate** — 21+ check (required for cannabis). Remembers you after the first time.
2. **Hero** — the crest, the name, the pitch.
3. **The Clubhouse** — the brand story + a "scorecard" info panel.
4. **The Greens** — the cannabis collection (flower, pre-rolls, vape) as a lookbook.
5. **The Pro Shop** — the apparel drops.
6. **The 19th Hole** — membership / email signup (the clubhouse bar).
7. **Tee Times** — where to buy (stockist dispensaries) + wholesale CTA.
8. **Footer** — links + the legal compliance block.

---

## Make it yours — swap these placeholders before launch

- [ ] **Real product photos** in *The Greens* and *The Pro Shop* (right now they're hand-drawn SVG product art — jars, tin, pre-roll pack, vape, and garment silhouettes). Drop images into an `assets/` folder and swap the `.product-visual` / `.apparel-visual` blocks for `<img>`.
- [ ] **Real strain names, types, and lab data** (THC %, etc.).
- [ ] **Real stockists** in the *Tee Times* list.
- [ ] **Your license number** in the footer — currently `#C00-0000000-LIC` (placeholder). **This is legally required on California cannabis advertising.**
- [ ] **Social links** in the footer (Instagram / TikTok).
- [ ] **Wire up the email form.** Right now it just shows a thank-you message — it doesn't store anything. Connect it to Mailchimp, Klaviyo, or Resend so you actually capture members. (Owned email/SMS is your most important channel — ad platforms ban cannabis, so this list is deletion-proof.)

## Colors & fonts (so you can tweak the brand)

All colors live at the top of `styles.css` under `:root` as variables — change them in one place:
- `--green-700` / `--green-600` — the emerald greens
- `--gold` / `--gold-2` — the brass accents
- `--cream` — the off-white text
- `--ink` — the near-black background

Fonts: **Cormorant Garamond** (the elegant serif) + **Inter** (the clean body text), loaded from Google Fonts.

---

## Deploy it (free)

The easiest path: drag this whole folder onto **[Netlify Drop](https://app.netlify.com/drop)** or **[Vercel](https://vercel.com)**. It's a static site, so it just works — you'll get a live URL in seconds. Point your real domain at it when ready.

After deploying, change the `og:image` meta tag in `index.html` to the full URL (e.g. `https://yourdomain.com/assets/cheeky-links-logo.png`) — social platforms need an absolute link for share previews.

## Compliance reminders (California)

- 21+ age gate ✔ (built in)
- License number on advertising — **add yours** (footer placeholder)
- Government warning ✔ (built in, in the footer)
- No health/medical claims, no content that appeals to minors — keep it that way in any copy you add.
