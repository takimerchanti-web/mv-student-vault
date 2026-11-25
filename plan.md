# MV Student Vault — Implementation Plan

## Product direction

MV Student Vault is a calm, private digital study room: a local-first student workspace that turns daily planning, notes, habits, and small engineering experiments into one dependable desktop. The first release prioritizes functional local behavior over decorative breadth, while keeping the architecture ready for the full requested tool suite.

## Design system

- **Design movement:** editorial productivity dashboard meets premium Dribbble workspace UI; tactile paper-like surfaces, quiet violet focus states, and compact utility controls.
- **Core principles:** calm clarity, local trust, progressive disclosure, and visible system state.
- **Color philosophy:** warm ivory and ink make the workspace feel grounded; violet is reserved for active focus and meaningful progress; semantic colors are muted and high-contrast rather than neon.
- **Layout paradigm:** a persistent navigation rail plus a contextual workbench. The dashboard uses asymmetric editorial modules (agenda rail, focus card, progress stack) instead of a generic centered grid.
- **Signature elements:** the MV monogram mark, a thin violet “study thread” progress line, and small uppercase section labels paired with generous whitespace.
- **Interaction philosophy:** every control changes local state immediately and reports what happened. Hover is subtle; selection is explicit; destructive actions are confirmable; empty states teach rather than pretend.
- **Animation:** 180–240ms fade/rise entrances, active navigation glide, soft press feedback, task checkmark motion, and smooth Pomodoro progress. Respect reduced motion and persist the preference.
- **Typography system:** system UI sans for dependable offline rendering; compact 11–12px uppercase labels, 14–16px body text, 28–38px editorial headings, and tabular numerals for timers and metrics.
- **Brand essence:** a private, beautiful study room for students who want their work to stay on their device. Personality: grounded, capable, encouraging.
- **Brand voice:** concise, warm, and useful. Example lines: “Make room for the work that matters.” / “Your study room is ready when you are.”
- **Wordmark & logo:** an outlined MV monogram built from two offset rounded strokes, paired with a small “STUDENT VAULT” wordmark.
- **Signature brand color:** Ink Violet `#6c5ce7` — an ownable violet used sparingly for focus, selection, and progress.

## Implementation approach

Use a client-only React + TypeScript + Vite application with no runtime network dependencies. IndexedDB is the source of truth for profile, tasks, timetable, habits, notes, files, and projects. localStorage holds small UI preferences (theme, scale, motion, sidebar). A lightweight context/state layer keeps the shell responsive while persistence helpers provide explicit save/error feedback. Service worker registration and a same-origin route manifest support offline reload.

The delivered product is organized into maintainable feature modules:

- `src/components/` — shell, navigation, cards, dialogs, empty states, primitives.
- `src/features/dashboard/` — summary cards, agenda, focus widget, recent work.
- `src/features/students/` — onboarding, timetable, subjects, notes, tasks, habits, files.
- `src/features/studios/` — Code Studio, Logic Designer, Circuit Designer, Presentation Studio workbenches.
- `src/lib/` — IndexedDB persistence, backup/restore, themes, scaling, service worker helpers, seeded examples.
- `src/types.ts` — shared domain types and project models.
- `public/` — route manifest, manifest, service worker and static icons.

## Delivery scope

The application will ship as a polished working MVP with:

1. Responsive shell, collapsible navigation, mobile drawer, keyboard focus, reduced motion, 14 complete themes, scaling shortcuts, and focus mode.
2. Onboarding/profile, dashboard, timetable editing, notes, tasks, habits, Pomodoro, files, settings, backup/restore, and storage status using local persistence.
3. Functional Code Studio foundation with editable source, examples, stdin, local educational interpreter subset (printf/arithmetic/loops/scanf), output/errors, run/stop state, and limitations disclosure.
4. Functional Logic Designer foundation with draggable/tap-added devices, selectable nodes, compatible pin connections, combinational evaluation, truth-table cap, and explicit sequential state controls.
5. Functional Circuit Designer foundation with supported parts, wiring, DC simulation for grounded resistor networks/sources/switches/LEDs, diagnostics, and visual-only badges.
6. Functional Presentation Studio foundation with slide rail, editable text/shapes/table/chart data, ordering, preview, and self-contained JSON/HTML export.
7. Offline shell caching, route manifest, production build, and documented test evidence/known gaps.

## Project structure

```text
mvstudent/
  public/                 # offline manifest, service worker, route manifest, icons
  src/
    components/           # shell and reusable UI
    features/             # dashboard, student workspace, engineering studios
    lib/                  # persistence, themes, interpreter, evaluators, exports
    App.tsx               # app routing and top-level state
    main.tsx              # React entry and global styles
    types.ts              # shared domain types
    styles.css            # theme tokens, responsive layout, motion
  package.json            # pinned pnpm toolchain and scripts
  pnpm-workspace.yaml     # lifecycle policy
  tsconfig.json
  vite.config.ts
  plan.md
  TODO.md
```

## Build and serving

`pnpm install` installs the pinned React/Vite toolchain. `pnpm build` runs TypeScript and Vite production bundling. Preview runs on the managed project port 3000, bound to `0.0.0.0`. Static hosting configuration is added only after the production output and offline behavior are verified.
