# Yoga Dhara with Priya

The website for Priya's traditional Sivananda yoga classes, live online and in person in Germany.

**Live (draft):** https://priyagit-ar.github.io/yogadhara/

It's a plain static site with no build step, no cookies, no tracking and no third-party requests. Fonts are self-hosted. It's served by GitHub Pages straight from this branch, so every push goes live within a minute or two.

```
index.html          the main page
impressum.html      legal notice (required in Germany)
privacy.html        privacy policy (Datenschutzerklärung)
assets/css/         one stylesheet
assets/js/          menu, WhatsApp form, mobile booking bar
assets/fonts/       Tiro Devanagari Sanskrit + Mukta (SIL Open Font License)
assets/img/         photos, link-preview image, icons
```

## Filling in the placeholders

Everything still to be filled in is wrapped in `<mark class="todo">…</mark>` and shows up highlighted on the page. To list what's left:

```sh
grep -n 'class="todo"' *.html
```

Values that repeat across pages are quickest to replace in one go:

```sh
grep -rln '49XXXXXXXXXXX' *.html | xargs sed -i 's/49XXXXXXXXXXX/49151XXXXXXXX/g'   # WhatsApp number, digits only
grep -rln 'instagram.com/HANDLE' *.html | xargs sed -i 's#instagram.com/HANDLE#instagram.com/yourhandle#g'
```

After replacing a value, remove its `<mark class="todo">` wrapper too.

**Photos:** replace `assets/img/class.jpg` (landscape, 1200 × 900) and `assets/img/priya.jpg` (portrait, 800 × 1000). Keep the file names, or update the `src` in `index.html`.

## Before launch

- [ ] Confirm the name's word with Priya: **धारा** (*dhārā*, a stream) or **धरा** (*dharā*, the earth). Much of the copy builds on "stream".
- [ ] Read the copy through with Priya and change anything that doesn't sound like her.
- [ ] Check the lineage dates in the About section, and fill in her own training.
- [ ] No `class="todo"` left: `grep -c 'class="todo"' *.html` shows 0 for every page.
- [ ] Have the Impressum and privacy policy checked, then delete their draft notes.
- [ ] Delete the draft banner (`<p class="preview-note">`) from all three pages.
- [ ] Delete `<meta name="robots" content="noindex">` from all three pages so search engines can find the site.
- [ ] Custom domain (optional): add a `CNAME` file containing `yogadharawithpriya.com`, point the domain's DNS at GitHub Pages, tick "Enforce HTTPS" under Settings → Pages, then update `og:url` and `og:image` in `index.html`.

## Previewing locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
