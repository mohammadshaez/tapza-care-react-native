# Tapza Care

Tapza Care is a React Native + Expo prototype for a health-care booking experience with configurable home sections, mock backend behavior, and test coverage around config validation and booking conflict handling.

## How to run

### 1) Install dependencies

```bash
npm install
```

### 2) Start the app locally

```bash
npx expo start
```

Then choose one of the Expo launch options:

- Android emulator
- iOS simulator
- Expo Go
- web preview

### 3) Useful project commands

```bash
npm run typecheck
npm run lint
npm test
```

## Folder structure and why

```text
src/
  app/                  # Expo Router screens; keep thin and route-focused
  components/          # reusable UI pieces and layout wrappers
  config/              # runtime config and validation schemas
  features/            # feature-specific screens, hooks, and section renderers
  services/
    api/               # typed API boundary and mock client
    cache/             # config persistence and last-good cache logic
    mock/              # mock backend fixtures and validation helpers
  store/               # small Zustand stores for client-side toggles
  theme/               # design tokens, theme derivation, and theme provider
  types/               # shared domain contracts
  tests/               # focused validation and behavior regression checks
```

Why this shape:

- routes stay thin and delegate to feature logic
- home/domain behavior lives close to the relevant screen code
- validation and API boundaries are explicit instead of spread across components
- theme and config are centralised so the app can switch between “normal” and Diwali layouts without breaking the UI model

## Architecture decisions

### Expo Router + feature-first folders

The app uses Expo Router for route-level structure but keeps the actual implementation in feature folders under `src/features`. This avoids mixing business logic into route files and keeps screens readable.

### TanStack Query for server state, Zustand for UI state

- Query is used for config, doctors, slots, and prescriptions data
- Zustand is used for lightweight toggles such as mock failure states and config mode

### Validation at the boundary

Config and request payloads are parsed with Zod before being used. This keeps app state consistent and prevents invalid remote data from spreading into UI components.

### Mock backend matches the real interface

The mock API client intentionally mirrors the same service interface as a future real backend. It means the rest of the app can stay stable while the data layer changes underneath.

### Theme derived from config

The app converts config colours into a validated theme rather than hard-coding raw colours across screens. This makes the Diwali / normal mode switch real and consistent.

## What was cut and why

This version intentionally does not include:

- full production backend integration
- real payment / booking persistence
- offline sync, push notifications, or deep auth flows
- a large component library or design system package
- exhaustive visual polish across every screen and edge case

Why:

- the goal was to keep the prototype focused on the config-driven home experience and booking flow
- the architecture is intentionally lean so it remains easy to extend without reworking the foundation
- a smaller scope reduces risk and makes the code reviewable in one pass

## Honest time spent

This project took roughly:

- 1 hour to reset the Expo starter and set the project structure
- 2–3 hours to align the config, schema, mock data, and typed contracts
- 1–2 hours to fix the compatibility and import issues across the app and tests
- 1 hour to tune the home-section visual refinements and status-bar/header behavior
- 0.5–1 hour for validation and final cleanup

Total: about 6–9 focused hours for a working, structured prototype rather than a production-grade healthcare app.

## Current status

This repo is a functional prototype foundation with:

- typed config validation
- mock doctor and booking flows
- responsive home section rendering
- theme switching between normal and Diwali variants
- focused Jest coverage for config and booking behavior

It is ready for extension, but it is still intentionally scoped as a product prototype rather than a completed clinical platform.
