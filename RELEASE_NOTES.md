# v1.0.0

Open PDFs from Open edX and POSTECH LMS in Chrome's PDF viewer.

- Add your Open edX site from the extension popup.
- Toggle inline PDF viewing on or off, with settings saved across restarts.
- Manage site permissions from a minimal, square-edged English interface.
- PDF-specific response handling preserves other attachment downloads.

## Install

Requires Chrome 128 or later.

1. Download `open-edx-pdf-viewer-v1.0.0.zip` and extract it.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the extracted folder containing `manifest.json`.
4. Open your Open edX LMS tab, click the extension, and select **Add current LMS site**.

POSTECH LMS is included by default. Changes apply to the next PDF you open.

PDFs served as `application/octet-stream`, JavaScript-triggered downloads, or files hosted on an unregistered server may need additional handling. Chrome's PDF settings must allow opening PDFs in the browser.

## Validation

Manifest JSON, JavaScript syntax, and package contents were checked during preparation. Live Open edX behavior has not been verified in this environment.
