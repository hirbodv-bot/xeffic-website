# Xeffic CMS patch — editable Card ID and Card name

Upload these two files to the same paths in your GitHub repository:

- `.pages.yml`
- `assets/js/cms-content.js`

What changes:
- Card ID is editable in Pages CMS.
- Card name is editable in Pages CMS.
- The runtime has a position fallback so changing an existing Card ID will not immediately disconnect that card from the website.

Notes:
- Keep Card IDs unique. Recommended format: lowercase words separated by hyphens, e.g. `engineering-documentation`.
- Card name is the friendly name shown inside the CMS.
- The visible website heading is controlled by `Card heading`.
