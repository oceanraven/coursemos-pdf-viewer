# Open edX PDF Viewer

Open PDFs from Open edX and POSTECH LMS in Chrome's PDF viewer. Requires Chrome 128 or later.

## Setup and usage

1. Open `chrome://extensions` and enable **Developer mode**.
2. Choose **Load unpacked** and select this folder. Reload the extension if it is already installed.
3. On your Open edX LMS tab, open the extension, click **Add current LMS site**, and allow access to that site. POSTECH LMS is included by default.
4. Use **ON / OFF** to toggle the feature globally. Settings and site permissions persist across browser restarts. Changes apply to the next PDF you open.

## Scope

- Sets `Content-Disposition: inline` only for responses with `Content-Type: application/pdf` from registered sites. Other downloads and page links keep their existing behavior.
- Works without relying on a specific Open edX domain or URL path. If a PDF redirects to a separate file server, add that server's address too.
- Downloads triggered directly by JavaScript, or PDFs served as `application/octet-stream`, may not be affected.
- If Chrome is configured to always download PDFs, change its PDF setting to open them in the browser.
- **Remove** revokes access to the selected site. Manage the default POSTECH permission in Chrome's extension site access settings.

## Verification

Open a PDF from your LMS and confirm it displays in the browser. Switch OFF, then reopen the same link to confirm the original behavior returns. Also check non-PDF attachments, embedded Open edX PDF iframes, and settings persistence after restarting Chrome.

## Release downloads

For installation, download `open-edx-pdf-viewer-v1.0.0.zip` from GitHub Releases, extract it, and select the extracted folder using **Load unpacked**. The release ZIP contains only the five extension runtime files; it is not a signed CRX installer.

## Build packages

Run with Python 3 from the repository root:

```sh
python3 scripts/package.py
```

This creates two packages in `dist/`:

- `open-edx-pdf-viewer-v1.0.0-source.zip`: GitHub-ready source, documentation, and packaging script. Extract it and upload the enclosed folder's contents to your repository.
- `open-edx-pdf-viewer-v1.0.0.zip`: Extension runtime files with `manifest.json` at the ZIP root. Attach this file to the GitHub Release tagged `v1.0.0`; use `RELEASE_NOTES.md` for the release description.

Local tool settings, browser metadata, and generated packages are excluded from the source archive.
