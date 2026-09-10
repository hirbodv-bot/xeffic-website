Xeffic Services Order Control Patch

What this patch does
- Adds “Display order (1 = first)” to each service card in Pages CMS.
- Makes “AI-enabled engineering workflows” appear first by default.
- Automatically renumbers the visible service cards 01, 02, 03... after reordering.
- Keeps your existing content/services.json untouched, so your text and uploaded images are not overwritten.

Upload/replace these TWO files in GitHub:
1. .pages.yml
2. assets/js/cms-content.js

Then in Pages CMS:
Services page → expand the section containing the service cards → expand each card → Display order.

Suggested order:
1  AI-enabled engineering workflows
2  Flood intelligence and AI-assisted risk workflows
3  Waste-heat recovery and thermal systems
4  FEA, CFD and engineering analysis
5  Carbon capture and low-carbon engineering
6  Research, testing and technical development

Save in Pages CMS and allow Cloudflare to redeploy.
