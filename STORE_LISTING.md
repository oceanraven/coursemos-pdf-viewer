# Chrome Web Store submission

## Name

CourseMOS PDF Viewer

## Summary

Open PDFs from CourseMOS-based LMS sites, including POSTECH LMS in a new browser tab. Toggle on or off anytime.

## Detailed description

Keep your course page open while reading PDFs.

CourseMOS PDF Viewer opens identifiable PDF links in a new tab and asks Chrome to display PDF responses in its built-in viewer instead of downloading them.

Features:
- Add your institution's CourseMOS site from the extension popup.
- POSTECH LMS support included by default.
- Turn the feature ON or OFF anytime.
- Preferences persist across browser restarts.
- Minimal interface with English labels.
- Local processing with no analytics or tracking.

Getting started:
1. Open your CourseMOS LMS site.
2. Open the extension and click “Add current LMS site”.
3. Allow access to that site, then click a PDF link.

Requires Chrome 128 or later. Chrome must be configured to open PDFs in the browser. PDF links without a recognizable URL or filename, JavaScript-driven downloads, and PDFs served with a non-PDF content type may retain their original behavior. Files on a separate server require permission for that server too.

An independent project, not affiliated with or endorsed by CourseMOS or POSTECH.

## Single purpose

Open PDFs from user-authorized LMS sites in new browser tabs using Chrome's built-in PDF viewer.

## Permission justifications

- declarativeNetRequestWithHostAccess: Sets Content-Disposition to inline for application/pdf responses from authorized sites so Chrome can display PDFs.
- storage: Saves the local ON/OFF preference and authorized-site list. No synchronization or external transmission.
- activeTab: Reads the current tab URL when the user opens the popup so they can add their LMS site.
- scripting: Registers and injects a bundled content script on authorized sites to identify PDF link clicks and open them in a new tab.
- https://plms.postech.ac.kr/*: Provides built-in support for POSTECH LMS.
- Optional HTTP/HTTPS host permissions: CourseMOS installations use institution-specific domains. Access is requested only for the specific site the user adds. This also supports local HTTP installations.

## Data disclosures

No user data is collected or transmitted to the developer. Site URLs and preferences are processed and stored locally. Review these statements against the exact build submitted and answer the dashboard's privacy questions accordingly. No remote code is used.

## Privacy policy URL

After pushing PRIVACY.md to GitHub, use:
https://github.com/oceanraven/open-edx-pdf-viewer/blob/main/PRIVACY.md

## Store assets

- Included: `icons/icon128.png`, referenced in manifest.json and included in the extension ZIP.
- At least one genuine screenshot, 1280 × 800 or 640 × 400, showing the extension in use.
- Prepare a 440 × 280 promotional image if requested by the dashboard.

The runtime ZIP includes all manifest icons. Capture genuine screenshots and test the extension on your LMS before submission.

## Submission steps

1. Register at https://chrome.google.com/webstore/devconsole and pay the one-time developer registration fee.
2. Capture the required screenshots, test the extension on an actual LMS, and rebuild the runtime ZIP.
3. Create a new item and upload the runtime ZIP, not the source ZIP.
4. Fill out the listing, images, privacy disclosures, and permission justifications above.
5. Supply reviewer instructions for any login-only LMS functionality. Never include personal credentials in the repository or release ZIP.
6. Choose distribution settings and submit for review when ready.

Official references:
- https://developer.chrome.com/docs/webstore/register
- https://developer.chrome.com/docs/webstore/prepare
- https://developer.chrome.com/docs/webstore/images
- https://developer.chrome.com/docs/webstore/publish
