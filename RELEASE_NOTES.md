# v1.1.4

- Rename the extension to CourseMOS PDF Viewer and correct LMS platform descriptions.

- Reserve space for popup status messages to prevent the footer from jumping when buttons are clicked.
- Keep the previous message visible while applying settings.
- Rebuild the site list only when its contents change.
- Retain the PDF new-tab fix introduced in v1.1.3.

## Install

Requires Chrome 128 or later.

1. Download `coursemos-pdf-viewer-v1.1.4.zip` and extract it.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the extracted folder containing `manifest.json`. Reload an existing installation after replacing its files.
4. Open your CourseMOS LMS tab, click the extension, and select **Add current LMS site**.

POSTECH LMS is included by default. Changes apply to the next PDF you open.

## Limitations

Opaque PDF URLs and JavaScript-only download controls may retain their original tab behavior. Ctrl/Cmd/Shift clicks and middle-clicks preserve browser defaults. PDFs served as `application/octet-stream` or hosted on an unregistered server may need additional handling. Chrome's PDF settings must allow opening PDFs in the browser.

The runtime ZIP includes the extension icons. See `STORE_LISTING.md` in the source package for remaining submission steps, including screenshots.

## Validation

Version consistency and ZIP contents were verified during packaging. Live CourseMOS LMS behavior has not been verified in this environment.
