# Xeffic — current website + Pages CMS

This package is the uploaded Xeffic website with a CMS layer added. The existing design, navigation and visible content were kept as the fallback.

## What was added

- `.pages.yml` — Pages CMS configuration
- `content/` — editable JSON content for every existing page
- `media/` — images uploaded through Pages CMS
- `assets/js/cms-content.js` — loads CMS content into the existing HTML
- optional image/gallery styles appended to `assets/css/styles.css`

## Editing

Open `https://app.pagescms.org`, choose the `xeffic-website` repository and the `main` branch. You can edit page headings/text and upload a main image, gallery images, and card images for each section. Save in Pages CMS; it commits to GitHub and your existing Cloudflare deployment can redeploy automatically.

## Important

Upload **all files from this package** to the repository root, including hidden `.pages.yml`, `content/`, `media/`, and `assets/js/cms-content.js`.

The original HTML content remains in each page as a fallback, so the site does not depend on the CMS service being online for visitors.
