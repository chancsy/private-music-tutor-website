# Private Piano Tutor — Website & Poster

A one-page marketing website plus four print-ready poster/flyer variants, built as
plain static HTML/CSS/JS (no build step, no framework — just open the files in a browser).

## What's here

```
index.html                          Main website (single page)
poster/
  poster-elegant-classical.html     Poster variant 1 — navy/burgundy/gold on ivory, serif
  poster-dark-gold.html             Poster variant 2 — gold + ivory on near-black navy, serif
  poster-warm-approachable.html     Poster variant 3 — cream/terracotta/sage, rounded sans
  poster-modern-minimalist.html     Poster variant 4 — black/white/emerald, geometric sans
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

`index.html` has a floating style switcher (bottom-right: Classical / Dark Gold / Warm / Minimal)
so you can preview all four live in a browser before committing to one. You can also open a
specific style directly with a URL parameter — `?theme=classical`, `?theme=dark`, `?theme=warm`
or `?theme=minimalist` — handy for sending someone a link to one particular version. Once
you've picked a favourite:

- For the **website**, you can just leave the switcher in (it's harmless — hidden on print)
  or change `<html data-theme="...">` in `index.html` to your chosen theme and delete the
  `.theme-switcher` block.
- For the **poster**, just use whichever of the four `poster/poster-*.html` files matches
  your chosen style, and ignore/delete the other three.

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
- Photos — drop real files into `assets/images/` using these filenames (the HTML already
  references them, and shows a labelled placeholder box if a file is missing):
  - `portrait.jpg` — portrait of the teacher (about section, 4:3)
  - `clavinova.jpg` — white Yamaha Clavinova CLP close-up (hero, cropped to 4:5)
  - `electone.jpg` — Yamaha Electone ELS-02 (studio section, 4:3)

  `clavinova.jpg` and `electone.jpg` currently contain free stock stand-ins (see Photo credits
  below). Replacing them with photos of the actual instruments is strongly recommended — and once
  you do, delete the corresponding credit line from the footer in `index.html`.

## Photo credits (current stand-in images)

- `clavinova.jpg` — "White piano keys" by Parvez AzarQaderi, Unsplash
  (https://unsplash.com/photos/jqvpD7xwLns), Unsplash License (free to use, credit appreciated).
- `electone.jpg` — "ELS-02C Stagea (2014)" by Mintos 23, Wikimedia Commons
  (https://commons.wikimedia.org/wiki/File:ELS-02C_Stagea_(2014).jpg), CC BY-SA 4.0, cropped.
  Attribution is **required** for as long as this image is used — it's in the site footer.

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
   For the Dark Gold poster also tick **Background graphics** (under "More settings"), or the
   dark page prints as white.
3. Check the print preview shows one full page with no content cut off before saving.

## Scroll-transition concepts (`concepts/`)

Three self-contained explorations of a single page whose look shifts as you scroll — teens &
students at the top, young children in the middle, working adults at the bottom. Same content in
each; the difference is *how* the page transitions. Start at `concepts/index.html`.

- `concepts/scroll-morph.html` — **Morph.** Colours, blobs and typography interpolate continuously
  with scroll position (JS sets two mix percentages; CSS `color-mix()` blends). Light throughout.
- `concepts/scroll-chapters.html` — **Chapters.** Three full-screen chapters; the backdrop
  crossfades dark indigo → pastel → dark gold. The most dramatic.
- `concepts/scroll-stage.html` — **Stage.** A pinned illustrated keyboard swaps props and colours
  as the audience panels scroll past; becomes a compact sticky strip on phones.

They share the main site's photos and QR code but none of its CSS, so they can be deleted or
promoted without touching `index.html`. All kids-zone artwork is original SVG.

### Video-led concepts (`concepts/video-*.html`)

A second round with far fewer words, built around performance video:

- `concepts/video-reel.html` — **Reel.** Three full-screen video scenes that stack as you scroll.
- `concepts/video-stage.html` — **Stage, video edition.** A pinned player that switches clips per audience.
- `concepts/video-quiet.html` — **Quiet.** One hero video, credentials, three audience cards, a note, contact.

Videos are **YouTube embeds** driven by `concepts/yt-scroll.js` (YouTube IFrame API, privacy-enhanced
`youtube-nocookie.com` host). Each player starts **muted** when its section scrolls into view and
pauses when it leaves — browsers only allow un-gestured autoplay when muted — and every page has a
"Sound off/on" toggle. Users who prefer reduced motion get normal controls instead of autoplay.

The clip currently embedded is 826aska's YOASOBI「勇者」Electone cover (`SXF8kXsjquA`), credited
on each page as an example of the instrument, entered at a different point per audience. It is the
one 826aska YOASOBI cover that allows embedded playback — 夜に駆ける, アイドル and 祝福 return
player error 150 (the rights holder blocks playback on other sites), so they can only be linked.
Any video you pick gets the same check: open the page and look for a `yt-scroll.js` warning in the
browser console. To use your own footage, upload it to YouTube (**unlisted** is fine — it won't
appear in search or on your channel page) and change the IDs and `start` seconds in the `VIDEOS`
block at the bottom of each page. Landscape 16:9 works best; keep the first few seconds visually
interesting, since the hero and scene videos are cropped to fill the screen.

## Hosting

Not decided yet. These are plain static files, so they'll work on GitHub Pages, Netlify,
Cloudflare Pages, or any basic web host without changes — just point it at this folder.

## Version control

This folder is a git repo (`git init` was run locally). If a portable Git install is being
used instead of a system-wide one, point commands at its `git.exe` directly, e.g.:

```
& "C:\Users\soony\Downloads\programs\PortableGit\bin\git.exe" -C . status
```
