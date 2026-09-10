Xeffic Contact Form Recovery — SAFE MERGED PATCH

This repair restores the Formspree connection that was present in the last known working direct contact form while keeping:
- Services drag-and-drop order
- Per-service images
- Contact topic CMS list and ordering

UPLOAD/REPLACE ONLY THESE TWO FILES FIRST:
1. .pages.yml
2. assets/js/cms-content.js

Do NOT replace contact.html or assets/js/main.js if your public Contact page still shows the direct "Send message" form.

After deployment:
1. Pages CMS -> Site settings, logo, menu & colours
2. Confirm "Contact form submission URL (Formspree)" contains:
   https://formspree.io/f/mppzyzvd
3. Save if necessary.
4. Test the Contact page.

The backup-working-form folder contains the exact older working direct-form contact.html/main.js/styles.css from the previously generated Formspree patch. Use those only if the actual contact.html or main.js was separately overwritten.
