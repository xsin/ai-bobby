# Local vendor assets

This demo must work from `file://`, so third-party code is vendored and bundled
into a classic script; there are no CDN/import-map requests at runtime.

| Asset | Source | License |
|---|---|---|
| `three.module.min.js`, `three.core.js` | three.js 0.186.1 (`build/`) | MIT, see `THREE-LICENSE.txt` |
| `fonts/space-grotesk.woff2` | Space Grotesk (Google Fonts, latin subset) | SIL OFL 1.1, see `fonts/SPACE-GROTESK-OFL.txt` |
| `fonts/jetbrains-mono.woff2` | JetBrains Mono (Google Fonts, latin subset) | SIL OFL 1.1, see `fonts/JETBRAINS-MONO-OFL.txt` |

Rebuild the browser bundle after editing `app.js`:

```bash
./build.sh
```
