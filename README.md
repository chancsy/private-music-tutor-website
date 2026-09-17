# Private Piano Tutor — Website & Poster

A one-page marketing website plus three print-ready poster/flyer variants, built as
plain static HTML/CSS/JS (no build step, no framework — just open the files in a browser).

## What's here

```
index.html                          Main website (single page)
poster/
  poster-elegant-classical.html     Poster variant 1 — navy/burgundy/gold, serif
  poster-warm-approachable.html     Poster variant 2 — cream/terracotta/sage, rounded sans
  poster-modern-minimalist.html     Poster variant 3 — black/white/emerald, geometric sans
assets/
  css/styles.css                    Shared theme tokens + website styles
  css/poster.css                    Poster-specific print layout (A4)
  images/                           Photos go here (currently empty — see below)
  qr/whatsapp-qr.png                Generated WhatsApp QR code
scripts/
  generate_qr.py                    Regenerates the WhatsApp QR code
  requirements.txt                  Python deps for generate_qr.py
```

## Picking a style

`index.html` has a theme switcher at the top (Elegant Classical / Warm & Approachable /
Modern Minimalist) so you can preview all three live in a browser before committing to one.
Once you've picked a favourite:

- For the **website**, you can just leave the switcher in (it's harmless — hidden on print)
  or change `<html data-theme="...">` in `index.html` to your chosen theme and delete the
  `.theme-switcher` block.
- For the **poster**, just use whichever of the three `poster/poster-*.html` files matches
  your chosen style, and ignore/delete the other two.

## Filling in real content

Every placeholder is visually marked (dashed outline, "[placeholder]" text or `[...]`
bracketed text) in both the website and the posters. Search for `placeholder` and `[` in
`index.html` and the `poster/*.html` files to find everything that needs real content:

- Studio/business name and wife's name
- Short bio paragraph
- Phone number, WhatsApp number, email
- Instruments/subjects, levels, ages, service area, lesson format
- Pricing (or "contact for rates")
- Testimonials (optional — delete the block(s) if none are available)
- Photos — drop real files into `assets/images/` (e.g. `portrait.jpg`) matching the
  filenames referenced in the HTML, or update the `src` attributes to match your filenames

## Updating the WhatsApp QR code

Once the real phone number is confirmed:

```
pip install -r scripts/requirements.txt
python scripts/generate_qr.py +60123456789
```

This overwrites `assets/qr/whatsapp-qr.png` with a QR code that opens a WhatsApp chat to
that number. Re-run it any time the number changes. Also update the `tel:`, `wa.me`, and
visible phone number text in `index.html` and the poster files to match.

## Previewing the website

Just open `index.html` directly in a browser, or serve it locally:

```
python -m http.server 8000
```

then visit `http://localhost:8000`.

## Exporting a poster to PDF for printing

1. Open the chosen `poster/poster-*.html` file in a browser.
2. Print (Ctrl+P / Cmd+P) → destination "Save as PDF" → paper size **A4** → margins **None**.
3. Check the print preview shows one full page with no content cut off before saving.

## Hosting

Not decided yet. These are plain static files, so they'll work on GitHub Pages, Netlify,
Cloudflare Pages, or any basic web host without changes — just point it at this folder.

## Version control

This folder is a git repo (`git init` was run locally). If a portable Git install is being
used instead of a system-wide one, point commands at its `git.exe` directly, e.g.:

```
& "C:\Users\soony\Downloads\programs\PortableGit\bin\git.exe" -C . status
```
