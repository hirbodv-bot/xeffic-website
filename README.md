# Xeffic self-editing website (Pages CMS enabled)

This version keeps the current design but moves the editable text and images into `content/*.json`.

## What you can edit yourself
- Homepage hero text and hero image
- Manufacturing AI, Industrial Energy, Simulation and Flood AI card text + image
- Who We Help cards + optional images
- How We Work text + image + steps
- Homepage CTA + optional background image
- Sustainability and industry sections
- Manufacturing AI page text, every capability card image, and a gallery
- Energy & Simulation page text/images and gallery
- Flood AI page text/images, step images and gallery
- About page text/images and gallery
- Contact page text/images
- Logo and email addresses

## First-time Pages CMS setup
1. Upload ALL files and folders in this package to the root of your GitHub `xeffic-website` repository.
2. Make sure `.pages.yml`, `content/`, and `media/` are uploaded.
3. Go to https://app.pagescms.org and sign in with GitHub.
4. Install/authorize the Pages CMS GitHub App for the repository.
5. Open `xeffic-website`. Pages CMS reads `.pages.yml` automatically.
6. Choose `Homepage`, `Manufacturing AI page`, `Energy & Simulation page`, etc.
7. Edit text or click an Image field to upload/replace an image.
8. Save. Pages CMS commits the change to GitHub.
9. Cloudflare redeploys automatically from GitHub.

## Images
Uploaded images are stored in `media/`. Pages CMS writes public paths such as `/media/your-image.webp`.

For best speed, use JPG/WebP images around 1200-1800 px wide rather than huge camera originals.
