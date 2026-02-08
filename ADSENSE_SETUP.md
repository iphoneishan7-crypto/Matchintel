# AdSense Setup Guide for MatchIntel

Your MatchIntel website is now fully prepared for Google AdSense approval. Follow these steps to activate monetization.

## 1. Replace Placeholder Ad Codes

The website currently uses placeholder codes. You must replace them with your actual AdSense Publisher ID and Ad Slot IDs.

### Publisher ID replacement
Find this string in all HTML files: `ca-pub-XXXXXXXXXXXXXXXX`
Replace it with your unique Publisher ID (e.g., `ca-pub-1234567890123456`).

Files to update:
- `index.html` (Head section + 2 ad units)
- `match.html` (Head section + 4 ad units)

### Ad Slot ID replacement
Replace the `data-ad-slot="NUMBER"` values in the ad units with real slot IDs from your AdSense dashboard.

## 2. Verify Mandatory Pages
AdSense requires these pages, which have been created for you:
- **About Us** (`about.html`): Explains your mission and data sources.
- **Privacy Policy** (`privacy.html`): Required for GDPR/CCPA compliance.
- **Contact Us** (`contact.html`): Provides a way for users to reach you.
- **Disclaimer** (`disclaimer.html`): Protects you from liability regarding data value.

## 3. SEO & Content Checks
- Ensure `robots.txt` is uploaded to your root directory.
- Verify that your API is feeding real data (AdSense rejects specific content).
- Do not modify the "No Betting" disclaimers - they are critical for approval.

## 4. Navigation
The footer and header links have been updated to point to these new pages. Test them to ensure they work correctly.

## 5. Ad Placement Strategy Used
We implemented a high-revenue, policy-compliant layout:
- **Homepage**: 
  - 1 unit after the match list main section.
  - 1 unit just before the footer.
- **Match Pages**:
  - 1 unit after the Scorecard (High visibility).
  - 1 unit after Playing XI.
  - 1 unit after Key Players.
  - 1 unit before the footer.

This layout balances user experience with monetization potential.

## 6. Apply for AdSense
1. Go to [Google AdSense](https://www.google.com/adsense/start/).
2. Add your site URL.
3. Paste the code snippet provided by Google into the `<head>` of `index.html` (Our placeholder code is already there, just update the ID).
4. Wait for approval (usually 2-14 days).

**Good luck with your monetization!**
