# Tapza Care

Tapza Care is a React Native + Expo prototype for a care-booking experience with a configurable home screen, mock backend behavior, type-safe config validation, and focused regression tests for booking and layout contracts.

## Repository status

The repo is currently in a validated prototype state:

- TypeScript checks pass
- Relevant Jest suites pass
- The app structure and mock APIs are stable
- Android release APK generation is still blocked on a missing local Android SDK in this environment

This means the app is functionally ready for extension and demonstration, but the actual signed Android APK output still requires a machine with the Android SDK configured.

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
  app/                        # thin Expo Router screens
  features/
    home/                    # home screen, header, and config-driven sections
    booking/                 # booking screen and booking state logic
    prescriptions/           # prescription list and report flow
  services/
    api/                     # typed API boundary and mock client
    cache/                   # config persistence fallback logic
    mock/                    # fixtures and mock backend helpers
  store/                     # Zustand stores for app toggles and test controls
  theme/                     # tokens, theme creation, and provider wiring
  config/                    # config schema and validation layer
  types/                     # shared domain contracts
  tests/                     # Jest coverage for config and booking behavior
  locales/                   # i18n strings for English and Hindi
```

Why this structure:

- route files stay thin and delegate to feature logic
- the home and booking flows live with their own hooks and renderers
- config and schema validation are centralised, not scattered through UI code
- mock data and the API layer are separated from screen code so they can evolve independently

## Architecture decisions

### Expo Router + feature-first layout

The app keeps routes in `src/app`, but the real business logic and rendering live under feature folders. This keeps the app easier to understand and easier to extend without a UI-heavy route file.

### Query + state split

- TanStack Query handles configuration and remote-like data access
- Zustand handles lightweight local controls and UI simulation states
- This mirrors a realistic app split between remote data and local interaction state

### Validation at the boundary

Config and booking payloads are parsed through strict schemas before they are used. This protects the app from invalid theme content or broken booking requests.

### Mock backend designed to match real contracts

The mock service intentionally mirrors the shapes and flows a real backend would expose. That allows the rest of the app to remain stable while the data layer changes underneath.

### Config-driven theming

The app derives its theme from validated config colors and gradients rather than hard-coded values in screens. The Diwali variant and the normal mode are therefore driven from the same underlying theme model.

## What was cut and why

This prototype intentionally leaves out:

- production auth and identity flows
- production payment and billing integration
- offline sync and push notifications
- large design-system adoption
- full healthcare backend deployment and compliance workflows

Why:

- the task was to validate the architecture and interaction model, not ship a finished clinical platform
- the repository remains lightweight and reviewable
- the code is structured so future backend and production work can be added without reworking the foundation

## Honest time spent

This project took approximately:

- 1 hour to reset the Expo starter and align the project skeleton
- 2–3 hours to define the config, mock data, and contracts
- 1–2 hours to fix compatibility and schema drift across screens, tests, and mocks
- 1 hour to tune the home layout, card styling, and safe-area/header behavior
- 0.5–1 hour for final validation and documentation cleanup

Total: roughly 6–9 focused hours for a working, structured prototype rather than a production-grade medical app.

## Android APK / installable build

### Local Android build

This repo includes an Expo-generated Android project, but the local release APK will only build on a machine with the Android SDK installed and configured.

```bash
npx expo prebuild --clean
cd android
./gradlew assembleRelease
```

If the SDK is not configured, Gradle will fail with:

```text
SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir in local.properties.
```

The required local configuration is typically:

```properties
sdk.dir=C:\Users\<your-user>\AppData\Local\Android\Sdk
```

Place that file in:

```text
android/local.properties
```

Once configured, the APK is generated under:

```text
android/app/build/outputs/apk/release/
```

### Expo build option

If you are using EAS or another Expo build pipeline, run a signed Android build and share the resulting link with the install steps in the release notes or project documentation.

### Distribution guidance

- Attach the APK to a GitHub Release when available
- If using Expo build, include the direct link and installation steps
- Ask users to allow installs from unknown sources on Android before opening the APK

## Demo assets and recordings

The repo is prepared for screenshots and a short demo walkthrough in:

```text
docs/
  demo/
    README.md
    screenshots/
    demo-video.mp4
```

Add the required device screenshots and the 2–3 minute walkthrough there. The demo should cover the normal and Diwali theme states, the forced conflict path, and the booking flow.

## Current validation status

### Verified

- app typecheck passes
- relevant Jest suites pass
- config validation and booking state logic are stable
- home section rendering is stable under tests

### Not fully complete in this environment

- Android release APK generation requires a valid local Android SDK setup
- no signed release artifact has been attached yet from this machine because Gradle cannot resolve the SDK path

## Current status

This repo is a functional prototype foundation with:

- typed config validation
- mock doctor and booking flows
- responsive home section rendering
- theme switching between normal and Diwali variants
- focused regression tests for config and booking logic

It is ready for extension as a product prototype, but it remains intentionally scoped and not a full production clinical platform.
