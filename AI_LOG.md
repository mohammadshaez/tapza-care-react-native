# AI Log

## 2026-09-15 - Phase 1A

- Goal: remove Expo demo and establish project documentation
- Summary of prompt: reset the generated Expo starter into a minimal Tapza Care foundation, preserve required config and assets, remove demo code, and create canonical project instructions for future agents.
- Files created:
  - AGENTS.md
  - .cursor/rules/tapza-care.mdc
  - .github/copilot-instructions.md
  - docs/ai/PROJECT_BRIEF.md
  - docs/ai/ARCHITECTURE.md
  - docs/ai/IMPLEMENTATION_PLAN.md
  - docs/ai/MCP.md
  - src/app/_layout.tsx
  - src/app/index.tsx
- Files removed:
  - root app/ directory
  - src/app/explore.tsx
  - src/components/animated-icon.module.css
  - src/components/animated-icon.tsx
  - src/components/animated-icon.web.tsx
  - src/components/app-tabs.tsx
  - src/components/app-tabs.web.tsx
  - src/components/external-link.tsx
  - src/components/hint-row.tsx
  - src/components/themed-text.tsx
  - src/components/themed-view.tsx
  - src/components/web-badge.tsx
  - src/components/ui/collapsible.tsx
  - assets/images/tutorial-web.png
  - assets/images/react-logo.png
  - assets/images/react-logo@2x.png
  - assets/images/react-logo@3x.png
- Decisions accepted:
  - Keep Expo Router routes under src/app only.
  - Keep the existing git, package, config, and app assets intact.
  - Create a minimal foundation screen instead of implementing home/booking/prescription features.
- Suggestions rejected:
  - Keeping the Expo tutorial UI
  - Starting feature implementation before defining boundaries
  - Duplicating full instructions across every editor rule file
  - Committing credentials or personal MCP configuration
- Validation results:
  - TypeScript check pending after foundation shell change
  - Lint check pending after foundation shell change
  - Expo Doctor check pending after foundation shell change
- Human review still required:
  - Confirm the minimal screen matches the requested Phase 1A scope.
  - Confirm the repo reset is acceptable before Phase 1B begins.

## 2026-09-15 - Phase 1B foundation in progress

### Completed

- Established the project directory structure for app, features, services, theme, locale, tests, and docs.
- Added typed domain contracts for api, booking, config, doctor, prescription, and slot models.
- Added Zod validation schemas for app config, request payloads, gradients, colors, and fixtures.
- Added mock fixture data for normal and Diwali configurations, doctors, slots, and prescriptions.
- Added Zustand-based mock control store for latency, offline, empty, conflict, and config mode simulation.
- Added async-storage config cache with bundled fallback and last-good config persistence.
- Added typed mock API client and query keys for config, doctors, slots, booking, and prescriptions.
- Added theme token and config-driven theme creation utilities.
- Added app providers for query, safe area, gesture handling, and theme context.
- Added locale files and i18n setup for English and Hindi strings.
- Added app foundation screen with config-mode toggling and theme diagnostics for later feature screens.

### Needs to be implemented / cleaned up

- Fix the remaining TypeScript alias resolution issue so imports like @/... resolve correctly across the project.
- Resolve the remaining lint issues triggered by the web hook hydration pattern and any unused variables.
- Clean up the re-declared schema names in gradient validation and any warning-level issues before the repo is considered fully lint-clean.
- Verify the app provider wiring and ensure the theme config actually initializes reliably on first render.
- Add a focused test suite for config validation, mock API responses, and theme generation.
- Finalize the docs/log update once validation passes.
- Run the full project validation set: TypeScript, ESLint, Jest, and Expo Doctor.

### Current blockers

- Import path resolution for project aliases needs confirmation against the final project layout.
- React hook lint rule is enforcing a safer effect pattern for hydration and config loading.
- Expo Doctor still needs a dependency-version alignment check for the installed SDK.

### Validation status

- Partial lint checks were run and identified remaining alias and hooks issues.
- TypeScript and Expo validation remain pending until the path and dependency issues are corrected.
- Foundation architecture is in place, but the repo is not yet fully green for validation.

## 2026-09-17 - Compatibility and regression fix

- Goal: resolve the broken imports, outdated mock names, schema mismatches, and theme-contract errors preventing compilation and tests from succeeding.
- Summary of prompt: fix the previously introduced compatibility bugs without changing the approved architecture, then verify the app-state and config validation flows.
- Files changed:
  - src/features/home/components/home-header.tsx
  - src/store/mock-controls.store.ts
  - src/services/api/mock-api-client.ts
  - src/services/mock/mock-api-client.ts
  - src/types/booking.ts
  - src/types/config.ts
  - src/theme/theme-provider.tsx
  - tsconfig.json
  - src/mocks/fixtures/*.ts
- Root cause:
  - Home header imported a non-existent provider path.
  - Mock fixture paths and type names were inconsistent with the current services folder layout.
  - Booking controls still referenced the older forceBookingConflict contract while the app uses conflictNextBooking.
  - Theme usage in the header was based on a stale token shape that did not match the actual AppTheme contract.
  - Jest globals were not enabled in TypeScript for the test files.
- Decisions made:
  - Reused the real theme hook and token shape instead of introducing unsupported properties.
  - Added compatibility aliases for legacy fixture imports without changing the branch’s architecture.
  - Kept the mock control model consistent with active feature usage, including a reset path for forced conflict state.
- Validation results:
  - TypeScript check: passed
  - Relevant Jest suites: 3 passed, 7 tests passed
  - Lint: 0 errors, 2 warnings remain in unrelated files (home-screen hook dependency and unused import in prescriptions-screen)
- Human review still required:
  - Decide whether to clean the remaining lint warnings before merging.
- Suggested commit message:
  - fix: align theme, test, and mock contracts for config and booking flows
