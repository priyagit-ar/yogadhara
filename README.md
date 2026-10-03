# Yoga Dhara with Priya

The website for Priya's traditional Sivananda yoga classes, live online and in person in Germany, in English and German.

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
assets/fonts/         Tiro Devanagari Sanskrit + Mukta (SIL Open Font License)
assets/img/           photos, link-preview images (EN and DE), icons
```

## Two languages

Each page has a German twin, and the EN | DE switch in the header links the two. Switching keeps the reader in the same section, because both versions use the same section ids (`#classes`, `#about`, `#prices`, `#faq`, `#contact`). Nothing is stored in the browser, so the privacy policy stays true.

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

The WhatsApp number appears on every page, so it's quickest to replace in one go:

```sh
grep -rl '49XXXXXXXXXXX' --include=*.html . | xargs sed -i 's/49XXXXXXXXXXX/49151XXXXXXXX/g'   # digits only, no + or spaces
```

After replacing a value, remove its `<mark class="todo">` wrapper too.

**Photos** (both languages use the same files; to swap one, replace the file and keep its shape):

| File | Where | Shape |
|---|---|---|
| `assets/img/class.jpg` | Classes section | portrait 4:5 (880 × 1100) |
| `assets/img/priya.jpg` | About, next to Priya's letter | portrait 4:5 (960 × 1200) |
| `assets/img/practice-1.jpg` | Photo row under the letter | landscape 4:3 (1200 × 900) |
| `assets/img/practice-2.jpg`, `practice-3.jpg` | Photo row under the letter | portrait 3:4 (720 × 960) |

Save photos for the web without location data: most phone cameras add it.

## Before launch

- [ ] Confirm the name's word with Priya: **धारा** (*dhārā*, a stream) or **धरा** (*dharā*, the earth). Much of the copy builds on "stream".
- [ ] Read the copy through with Priya, in both languages, and change anything that doesn't sound like her.
- [ ] Have Priya read her letter in the About section (her own words, lightly edited) in both languages.
- [ ] Add the year of her teacher training to the lineage in the About section, and check the other dates there.
- [ ] No `class="todo"` left: `grep -rc 'class="todo"' --include=*.html .` shows 0 for every page.
- [ ] Have the Impressum and privacy policy checked (the German versions are the ones that count legally), then delete their draft notes.
- [ ] Delete the draft banner (`<p class="preview-note">`) from all six pages.
- [ ] Delete `<meta name="robots" content="noindex">` from all six pages so search engines can find the site.
- [ ] Custom domain (optional): add a `CNAME` file containing `yogadharawithpriya.com`, point the domain's DNS at GitHub Pages and tick "Enforce HTTPS" under Settings → Pages. Then replace `https://priyagit-ar.github.io/yogadhara/` with the new domain in all six pages (the `og:` and `hreflang` lines):

  ```sh
  grep -rl 'priyagit-ar.github.io/yogadhara/' --include=*.html . | xargs sed -i 's#https://priyagit-ar.github.io/yogadhara/#https://yogadharawithpriya.com/#g'
  ```

## Previewing locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000 (English) or http://localhost:8000/de/ (German)
```
