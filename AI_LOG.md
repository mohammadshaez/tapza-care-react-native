# AI Log

## 2026-09-15 - Phase 1A

- Goal: remove the Expo demo starter and establish a minimal Tapza Care foundation with project documentation.
- Summary of prompt: reset the generated Expo starter into a minimal Tapza Care foundation, preserve required config and assets, remove demo code, and create canonical project instructions for future agents.
- Files created:
  - AGENTS.md
  - docs/ai/PROJECT_BRIEF.md
  - docs/ai/ARCHITECTURE.md
  - docs/ai/IMPLEMENTATION_PLAN.md
  - docs/ai/MCP.md
  - src/app/_layout.tsx
  - src/app/index.tsx
- Files removed:
  - the root app directory from the default Expo starter
  - unused tutorial assets and demo components
- Decisions accepted:
  - keep Expo Router routes under `src/app`
  - keep app assets and package config intact
  - start with a minimal foundation screen rather than overbuilding features too early
- Validation results:
  - TypeScript, lint, and Expo validation were pending during scaffold setup

## 2026-09-15 - Phase 1B foundation

### Completed

- Established the project directory structure for app, features, services, theme, locales, tests, and docs.
- Added typed domain contracts for API, booking, config, doctor, prescription, and slot models.
- Added Zod validation schemas for config, request payloads, gradients, colors, and fixtures.
- Added mock fixture data for normal and Diwali configurations, doctors, slots, and prescriptions.
- Added a Zustand-based mock control store for latency, empty, conflict, and config mode simulation.
- Added async-storage config caching with fallback behavior.
- Added typed mock API clients and query keys for config, doctors, slots, booking, and prescriptions.
- Added theme token and config-driven theme creation utilities.
- Added the foundation app providers and locale setup.

### Remaining work at the time

- resolve alias and import issues across the project
- fix lint issues caused by older hydration patterns and unused imports
- clean up schema drift and stale contract names
- validate the app provider wiring and theme initialization
- finalize documentation only after validation passed

## 2026-09-17 - Compatibility and regression fix

- Goal: fix the broken imports, stale theme usage, outdated mock control names, and test typing issues preventing compilation and verification.
- Summary of prompt: align the app with the actual runtime contracts without changing the intended feature-first architecture, then validate configuration and booking behavior.
- Files changed:
  - src/features/home/components/home-header.tsx
  - src/features/home/home-screen.tsx
  - src/features/home/sections/home-sections.tsx
  - src/store/mock-controls.store.ts
  - src/services/api/mock-api-client.ts
  - src/services/mock/mock-api-client.ts
  - src/types/booking.ts
  - src/types/config.ts
  - tsconfig.json
  - src/mocks/fixtures/*.ts
- Root cause:
  - the home header imported a provider path that no longer existed
  - mock fixture paths and type names were inconsistent with the active service layout
  - state controls still referenced legacy names such as `forceBookingConflict` instead of the active `conflictNextBooking` flow
  - theme usage was still based on a stale token contract rather than the actual theme layer
  - Jest global types were not enabled for TypeScript test files
- Decisions made:
  - keep the real app design and architecture intact while restoring contract compatibility
  - add compatibility aliases where needed rather than rewriting the data model wholesale
  - preserve a single source of truth for mock controls and booking behavior
- Validation results:
  - TypeScript check: passed
  - relevant Jest suites: 3 passed, 7 tests passed
  - lint: 0 errors, 2 warnings remain in unrelated files (`home-screen` dependency array and unused import in `prescriptions-screen`)

## 2026-09-17 - Build verification and repo handoff status

- Goal: verify the repo state, generate documented build guidance, and confirm the current Android build status.
- Summary of prompt: update the project docs to match the latest implementation and note the real release-build constraint in the current environment.
- Repository status:
  - GitHub remote is connected and the repo has a multi-commit history
  - the app is functionally stable and typechecked
  - the project is ready for demo and extension work
- Build status:
  - `npx expo prebuild --clean` completed successfully
  - Android release build was attempted with `./gradlew assembleRelease`
  - Gradle failed because the machine does not currently have an Android SDK configured: `SDK location not found`
  - the exact missing setup is `ANDROID_HOME` or `sdk.dir` in `android/local.properties`
- Current conclusion:
  - the prototype itself is in a good state
  - the final APK artifact is still blocked by environment setup, not by app code regressions
  - the repo documentation should therefore show the install/build steps and the required Android SDK configuration rather than claiming an attached APK is already generated

## Final note

The key outcome from this phase is not just “the app works in code,” but that the repo is stable enough to continue with real distribution setup once the Android SDK is available. The remaining work is environment-specific and not a product logic problem.
