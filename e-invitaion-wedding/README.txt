# Khmer Luxury Wedding Invitation

## Project structure

- `index.html` — page structure and content
- `css/style.css` — all layout, colors, typography, animations and responsive styles
- `js/script.js` — names/date/venue settings, countdown, envelope interaction, music and QR uploads
- `assets/` — place your images and optional MP3 here

## Quick setup

1. Keep the folder structure unchanged.
2. Open `js/script.js` and edit the `WEDDING` object near the top:
   - `bride`, `groom`
   - `date` (Cambodia UTC+7 format, e.g. `2026-12-20T17:00:00+07:00`)
   - `venue`, `address`, `time`, `mapQuery`
3. Add these files to `assets/`:
   - `temple-entrance.jpg`
   - `love-story.jpg`
   - `prewedding-1.jpg` through `prewedding-6.jpg`
   - `wedding-song.mp3` (optional)
4. Open `index.html` in a browser, or run the folder with VS Code Live Server.

## ABA QR and music

The page includes local upload controls for an ABA QR image and a music file. These previews run in the visitor's browser; they do not send files to a server. For a public invitation, put your QR image and music in `assets/` if you want every guest to see/hear the same files automatically.

## Notes

- The Google Maps embed and map link use the `mapQuery` setting in `js/script.js`.
- The default date, names, venue and map location are demo placeholders. Replace them before publishing.
- Google Fonts are loaded online; a network connection is needed for those fonts.
