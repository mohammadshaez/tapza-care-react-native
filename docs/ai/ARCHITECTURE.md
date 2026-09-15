# Tapza Care architecture

## Approved technology choices

- Expo and React Native
- Expo Router with routes confined to src/app
- TypeScript strict mode
- TanStack Query for server state
- Zustand for lightweight client-side state
- AsyncStorage for caching and persisted user state
- Zod for runtime validation
- React Native Reanimated for motion
- React Native Gesture Handler
- Gorhom Bottom Sheet
- FlashList for high-volume collections
- Expo Image for remote media
- Expo Linear Gradient
- Expo Haptics
- Expo Notifications
- i18next/react-i18next
- date-fns
- lucide-react-native

## Responsibilities by folder

- src/app: top-level routes, thin entry screens only
- src/features: domain behaviours and feature-specific UI
- src/components: reusable UI primitives and adapters
- src/config: runtime configuration and app settings
- src/services/api: network logic and typed API client boundary
- src/services/cache: persistence and cache wrappers
- src/services/mock: mock backend interface and fixtures
- src/store: small Zustand stores
- src/theme: design tokens and theme derivation
- src/types: shared domain types
- src/utils: small focused utilities
- docs/ai: architecture and planning documents

## Server-state versus client-state ownership

Server state is owned by TanStack Query, especially remote configuration, doctor data, bookings, and prescriptions. Small device-side state such as selection, ephemeral UI state, and user preference toggles belongs in Zustand. AsyncStorage is used for last-known config and taken-dose persistency rather than as a general-purpose store.

## Config-fetch and caching flow

The app fetches configuration through the typed API service, validates it with Zod, and stores the last good version in AsyncStorage. The UI should render cached config immediately when possible and fall back to a safe default if the network response fails or the payload is invalid.

## Section-renderer registry design

A section registry will map section kinds like hero_banner, category_chips, quick_actions, service_grid, doctor_carousel, and offer_strip to renderers. Unknown section types safely return null and do not crash the app. Each renderer should accept validated section payloads and keep visual logic separated from business rules.

## Theme derivation flow

Remote config colours are converted into a validated theme object. Those values feed the design-token layer before UI rendering, while preserving semantic part names instead of raw literal hex values in individual components.

## Booking optimistic-update flow

The booking flow should optimistically create an order or reservation state, then reconcile the server result. If the backend responds with a 409 conflict, the app should show the correct recovery state without leaving the user in a broken or stale condition.

## Prescription dose-persistence model

Taken doses are persisted by date and prescription item, so the app can restore the daily completion record after reopening. The data model should be robust to time-zone and date-boundary edge cases without overcomplicating the UI.

## Error and offline behaviour

The app should handle loading, empty, and error states consistently. Offline behaviour should degrade gracefully using cached config and local state while avoiding undefined values or crashing renders.

## Performance strategy

- Use FlashList when rendering long or repeated collections
- Use Reanimated for scroll-linked motion and transitions
- Avoid creating animated values during render
- Keep list item render functions stable and lightweight
- Prefer validation and typed payloads at boundaries rather than in visual components

## Testing strategy

Important flows should be tested on Android with realistic state transitions rather than mock-only assertions. Use framework-appropriate tests for config parsing, booking conflict handling, and persistence logic without adding unnecessary scaffolding during the foundational reset.
