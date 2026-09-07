# Xeffic direct contact-form patch

This patch changes the Contact page from a mailto link to a direct background submission using Formspree. The visitor stays on xeffic.com; no email app or other page opens.

## Upload/replace these files in GitHub
- `.pages.yml`
- `contact.html`
- `assets/js/main.js`
- `assets/js/cms-content.js`
- `assets/css/styles.css`

## One-time Formspree setup
1. Create a Formspree form and set its notification email to the inbox you want (for example `hirbod@xeffic.com`).
2. Copy the endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. In Pages CMS open **Site settings, logo, menu & colours**.
4. Paste it into **Contact form submission URL (Formspree)**.
5. Optional: customise the success and error messages.
6. Save, wait for Cloudflare deployment, then submit a test enquiry.

The main contact email displayed on the site remains controlled by **Main contact email** in Pages CMS. The actual form delivery recipient is controlled in Formspree.
