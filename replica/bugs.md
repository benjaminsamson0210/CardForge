# Bug Report Log: Pika Studio

### Test Run: 2026-10-04 (Commit `24c18fb`)
**Total Bugs Found:** 0 Open S1, 0 Open S2, 0 Open S3, 0 Open S4.

---

### Resolved Items During Implementation

#### BUG-001 (Resolved): WCAG AA Contrast on Input Borders
- **Severity:** S3
- **Flow:** Design System Tokens
- **Screen:** All input controls (S01)
- **Description:** Initial token for `border-input` (#4b5563) had a 2.32:1 contrast ratio against the dark surface (#161922), failing WCAG 2.2 AA requirement (3:1 minimum for UI borders).
- **Resolution:** Adjusted `border-input` token value to `#6b7280`, reaching 3.63:1 (PASS). Verified with `contrast.py`.
- **Status:** **Fixed** in commit `049c15b`.

#### BUG-002 (Resolved): Cross-Browser Image Clipboard MIME Type
- **Severity:** S2
- **Flow:** F01 (Copy Image to Clipboard)
- **Screen:** S01 / Header
- **Description:** WebKit / Safari throws an exception when passing `image/webp` to `navigator.clipboard.write([new ClipboardItem(...)])`.
- **Resolution:** Enforced explicit `image/png` blob conversion for clipboard operations, while retaining WebP and PNG options for file downloads.
- **Status:** **Fixed** in commit `24c18fb`.
