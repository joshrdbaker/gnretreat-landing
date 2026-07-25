# GN Men's Retreat 2026 — Take Your Place

Single-page static landing page for **gnretreat.com**. Email capture only — "Save the Date" is the primary and only CTA. Registration opens later.

## Files

- `index.html` — page structure (7 sections, two Save the Date forms)
- `css/styles.css` — poster-matched palette, typography, hard-edged layout
- `js/main.js` — form validation, placeholder POST endpoint, success state
- `images/hero.jpg` — hero background (Adobe Stock preview; swap before launch)

## Local preview

```bash
cd gnretreat-landing
python3 -m http.server 8080
```

Open http://localhost:8080

## Save the Date form

Set `SAVE_THE_DATE_ENDPOINT` in `js/main.js` to your email provider or API route:

```javascript
const SAVE_THE_DATE_ENDPOINT = '/api/save-the-date';
```

Your endpoint should accept `POST` with JSON:

```json
{ "name": "optional string or null", "email": "required", "source": "gnretreat-save-the-date" }
```

Until the endpoint is wired, failed/network requests are treated as success so the inline confirmation UI is testable locally.

## Hero image

`images/hero.jpg` is compressed from the Adobe Stock **preview/comp** file (`AdobeStock_451771891_Preview.jpeg`). It includes the stock watermark and is capped at 1000px wide — fine for development. Replace with the licensed, unwatermarked, higher-resolution export before going live. The layout uses a single CSS background reference; swapping the file is enough.

## Deploy

Upload the folder to any static host (Cloudflare Pages, nginx, S3, etc.). No build step required.
