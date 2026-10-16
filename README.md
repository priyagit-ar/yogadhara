# Yoga Dhara with Priya

The website for Priya's Hatha yoga classes (drawing on her Sivananda training), live online and in person in Germany, in English and German.

**Live (draft):** https://priyagit-ar.github.io/yogadhara/ (English) · https://priyagit-ar.github.io/yogadhara/de/ (Deutsch)

It's a plain static site with no build step, no cookies, no tracking and no third-party requests. Fonts are self-hosted. It's served by GitHub Pages straight from this branch, so every push goes live within a minute or two.

```
index.html            the main page (English)
impressum.html        legal notice (required in Germany)
privacy.html          privacy policy
de/index.html         the main page (German)
de/impressum.html     Impressum (German)
de/datenschutz.html   Datenschutzerklärung (German)
assets/css/           one stylesheet, shared by both languages
assets/js/            menu, WhatsApp form, mobile booking bar, language switch
assets/fonts/         Cormorant, Allura and Mukta (SIL Open Font License)
assets/img/           photos, logo, link-preview images (EN and DE), icons
review/               preview images for Priya's feedback doc (logo and lettering options); not linked from the site
```

## Two languages

Each page has a German twin, and the EN | DE switch in the header links the two. Switching keeps the reader in the same section, because both versions use the same section ids (`#classes`, `#about`, `#prices`, `#contact`, plus `#faq` for the questions under the prices). Nothing is stored in the browser, so the privacy policy stays true.

**When you change text, change it in both languages:**

| English          | German                |
|------------------|-----------------------|
| `index.html`     | `de/index.html`       |
| `impressum.html` | `de/impressum.html`   |
| `privacy.html`   | `de/datenschutz.html` |

The German pages say "du", as most yoga studios in Germany do.

## Filling in the placeholders

Everything still to be filled in is wrapped in `<mark class="todo">…</mark>` and shows up highlighted on the page. To list what's left, in both languages:

```sh
grep -rn 'class="todo"' --include=*.html .
```

After replacing a value, remove its `<mark class="todo">` wrapper too.

**Photos** (both languages use the same files; to swap one, replace the file and keep its shape):

| File | Where | Shape |
|---|---|---|
| `assets/img/practice-1.jpg` | Wide photo under the opening | landscape 4:3 (1200 × 900), shown cropped to 21:9 |
| `assets/img/class.jpg` | Classes section | portrait 4:5 (880 × 1100) |
| `assets/img/priya.jpg` | About, next to Priya's letter, arched frame | portrait 4:5 (960 × 1200) |

Priya asked for three photos only. The ones taken off the page (`contact.jpg`, `triangle.jpg`, `faq.jpg`, `practice-2.jpg` to `practice-6.jpg`) are still in the git history if Priya wants one back.

Save photos for the web without location data: most phone cameras add it.

**Logo:** made from Priya's logo artwork, with the cream paper turned transparent so it sits on any light background.

| File | Where |
|---|---|
| `assets/img/logo.webp` (with `logo.png` as a fallback) | Hero, 840 × 840, transparent |
| `assets/img/logo-mark.png` | Header, 144 × 144, transparent |
| `assets/img/favicon-32.png`, `favicon-192.png` | Browser tab icons, on a cream tile |
| `assets/img/apple-touch-icon.png` | Phone home-screen icon, 180 × 180 |
| `assets/img/og-image.jpg`, `og-image-de.jpg` | Link previews (WhatsApp, Instagram…), 1200 × 630 |

## Before launch

- [ ] Priya picks the lettering (one-line or stacked, Wave 2 in her feedback doc) and approves the developed logo option 2; then use them in the opening, the header, the favicons and the link-preview images.
- [ ] Read the copy through with Priya, in both languages, and change anything that doesn't sound like her.
- [ ] Swap in Priya's revised About text when it's ready (the current one is her full original letter), in both languages.
- [ ] Prices, card validity, online schedule and platform, venue: all marked "To be confirmed" until Priya sends them. Monthly plans are hidden in an HTML comment in the prices section until she confirms them.
- [ ] The cancellation policy in the questions is Priya's draft, under review.
- [ ] No `class="todo"` left: `grep -rc 'class="todo"' --include=*.html .` shows 0 for every page.
- [ ] Have the Impressum and privacy policy checked (the German versions are the ones that count legally), then delete their draft notes.
- [ ] Delete the draft banner (`<p class="preview-note">`) from all six pages.
- [ ] Delete `<meta name="robots" content="noindex">` from all six pages so search engines can find the site.
- [ ] Custom domain, **only after Priya approves the site for launch**. `yogadharawithpriya.com` is registered at Squarespace and stays there; its Google Workspace email (`contact@yogadharawithpriya.com`) must keep working.
  1. In Squarespace's DNS settings, **leave the MX records and any Google TXT/CNAME records (SPF, DKIM, verification) untouched**. Only add or change the website records:
     - four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (remove any old Squarespace website `A` records for `@`)
     - a `CNAME` record for `www` pointing to `priyagit-ar.github.io`
  2. Add a `CNAME` file to this repo containing `yogadharawithpriya.com`, set the custom domain under Settings → Pages, and tick "Enforce HTTPS" once the certificate is issued.
  3. Send a test email to `contact@yogadharawithpriya.com` to confirm mail still arrives.
  4. Replace `https://priyagit-ar.github.io/yogadhara/` with the new domain in all six pages (the `og:` and `hreflang` lines):

  ```sh
  grep -rl 'priyagit-ar.github.io/yogadhara/' --include=*.html . | xargs sed -i 's#https://priyagit-ar.github.io/yogadhara/#https://yogadharawithpriya.com/#g'
  ```

## Previewing locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000 (English) or http://localhost:8000/de/ (German)
```
