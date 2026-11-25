# MV Student Vault

MV Student Vault is a managed, React + TypeScript + Vite web app for a private, offline-first student workspace. It is designed as a calm study room rather than a marketing site: data is stored locally in IndexedDB, small UI preferences use localStorage, and the app has no account or runtime third-party requests.

## Run locally

```bash
pnpm install
pnpm dev
# production verification
pnpm build
pnpm preview
```

The development server uses port `3000` and binds to `0.0.0.0` for the managed preview.

## Architecture

`src/App.tsx` owns the application shell and view-level composition. `src/types.ts` contains the domain model for the profile, timetable, tasks, notes, habits, files, code projects, logic, circuits, and presentations. `src/lib/persistence.ts` wraps IndexedDB, local preferences, and versioned backup validation. `src/lib/themes.ts` provides the 14 complete theme token sets. `src/lib/cWorker.ts` is a local Web Worker interpreter for the documented educational C subset. `public/sw.js` caches the app shell and same-origin assets, while `public/manus-routes.json` declares the app route.

The interface includes a collapsible sidebar, mobile drawer behavior, dashboard summaries, timetable editor, notes with visible autosave feedback, task filters, habit check-ins, file byte storage/download/delete, settings, backup/restore controls, Code Studio, Logic Designer, Circuit Designer, and Presentation Studio. Workspaces share the same theme variables, focus mode, motion preference, and responsive rules.

## Supported educational C subset

The local interpreter supports `int`, `float`, and `double` variables; numeric literals; `+`, `-`, `*`, `/`, `%`; comparisons and boolean operators; assignments; `if`; simple `while` and `for` blocks; `printf` with `%d`, `%f`, and `%%`; and `scanf` with `%d` values supplied through the stdin panel. It accepts a harmless `#include <stdio.h>` line in examples, but does not load native libraries. Execution runs in a Web Worker with 10,000 instruction, 12 KB output, and 64 KB stdin limits. Stop terminates the worker.

## Circuit model limitations

The Circuit Designer is not SPICE and does not claim AC, transient, thermal, microcontroller, or full Tinkercad behavior. The current working DC model covers ground reference, ideal DC source, resistor, switch-shaped parts, and a simplified LED value. It reports missing ground and invalid resistor values and exposes voltage/current results for the supported source/resistor calculation. Capacitors, inductors, transistors, and ICs are explicitly visual-only and are excluded from electrical calculations.

## Actual validation completed

- `pnpm build` succeeded after TypeScript diagnostics were registered.
- Preview root returned HTTP 200 and `/manus-routes.json` returned valid JSON.
- Onboarding accepted a local profile; the profile persisted through the IndexedDB-backed app and appeared in the dashboard.
- Notes workspace created a note, edited its title/body, and showed “Autosaved” feedback.
- Code Studio ran the bundled printf example in a Web Worker and displayed `Keep going, 100%` plus instruction count; unsupported header handling was corrected during validation.
- Focus mode changed `Enter Focus` to a visible `Exit Focus` control.
- Settings rendered all 14 theme choices; Midnight was switched on and visually applied.
- Mobile screenshot captured at 375×812 without page-wide overflow; onboarding and responsive controls remained usable.
- Service worker registration and cache invalidation were implemented; development-module caching is bypassed so updates do not mask unsaved-code changes.

## Known gaps

The visual studios are working foundations rather than complete EDA/CAD products. Logic currently provides tap-to-add devices, node selection, demo compatible links, switch/output state display, and capped truth-table output, but does not yet implement every listed gate family, sequential semantics, or full wire geometry. Circuit wiring and MNA coverage are intentionally limited to the documented supported model. Presentation Studio supports local slide editing and self-contained JSON/HTML export, but does not yet include full freeform resize/layer controls or imported-image editing. Browser-level offline reload with networking disabled, actual binary-file backup restore, all C examples/limits, every sequential logic case, and every presentation export path were not fully exercised in this session and are not claimed as verified.
