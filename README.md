# Xeffic Website

Static, responsive website starter for **xeffic.com**.

## Pages
- Home
- About
- Services
- Projects
- R&D
- Insights
- Contact
- Privacy

## Main focus areas
- Flood AI
- Industrial waste-heat recovery
- Engineering simulation
- AI & digital engineering
- Carbon & sustainability
- Applied R&D

## Deploy to Cloudflare Pages
1. Upload all files in this folder to the root of your GitHub repository `xeffic-website`.
2. In Cloudflare, open **Workers & Pages**.
3. Create a Pages project from your GitHub repository.
4. Production branch: `main`.
5. Framework preset: `None`.
6. Build command: leave blank if allowed.
7. Output directory: `/` or the repository root.
8. Deploy.
9. Add `xeffic.com` and `www.xeffic.com` as custom domains after your Cloudflare domain becomes active.

## Before commercial launch
Search the files for these placeholders and update them:
- `hello@xeffic.com`
- `https://www.linkedin.com/`

The contact form is intentionally static and opens the visitor's email client.
No analytics or cookie code is included in this starter package.

## SEO
The package includes:
- page-specific titles and descriptions
- canonical URLs
- basic Organization structured data
- `robots.txt`
- `sitemap.xml`

After deployment, add the site to Google Search Console and submit:
`https://xeffic.com/sitemap.xml`
