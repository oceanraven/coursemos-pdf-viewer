# v1.1.2

- Redesign the icon to match the popup: warm off-white, charcoal outlines, and a lime new-tab accent.
- Replace the dark background tile with a transparent, square-edged document symbol.
- Include refreshed 16, 32, 48, and 128 px icons and editable SVG source.

## Install

Requires Chrome 128 or later.

1. Download `open-edx-pdf-viewer-v1.1.2.zip` and extract it.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the extracted folder containing `manifest.json`. Reload an existing installation after replacing its files.
4. Open your Open edX LMS tab, click the extension, and select **Add current LMS site**.

POSTECH LMS is included by default. Changes apply to the next PDF you open.

## Limitations

Opaque PDF URLs and JavaScript-only download controls may retain their original tab behavior. Ctrl/Cmd/Shift clicks and middle-clicks preserve browser defaults. PDFs served as `application/octet-stream` or hosted on an unregistered server may need additional handling. Chrome's PDF settings must allow opening PDFs in the browser.

The runtime ZIP includes the extension icons. See `STORE_LISTING.md` in the source package for remaining submission steps, including screenshots.

## Validation

Version consistency and ZIP contents were verified during packaging. Live Open edX behavior has not been verified in this environment.
