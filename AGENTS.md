# Tapza Care AI agent instructions

## Project boundaries

- Use Expo managed workflow.
- Android is the primary platform.
- Expo Router routes live only in src/app.
- Route files must remain thin and delegate implementation to src/features.
- Do not create native android or ios directories unless explicitly requested.
- Use npm only.
- Never add dependencies without explaining why.
- Never commit secrets or credentials.
- Never silently change the approved architecture.

## TypeScript

- TypeScript strict mode must remain enabled.
- Do not use any.
- Do not use @ts-ignore or @ts-nocheck.
- Use unknown at untrusted API boundaries.
- Validate remote responses with Zod before using them.
- Prefer discriminated unions and exhaustive checking.
- Do not weaken compiler settings to fix errors.

## Design system

- Components must not contain raw colour literals.
- Components must use semantic theme tokens.
- Spacing and typography values must come from the theme.
- Remote config colours must be converted into a validated application theme.
- Tap targets must be at least 44 points.
- Respect OS font scaling.
- Ensure readable contrast.
- Support reduced-motion preferences.

## Architecture

- TanStack Query owns server state.
- Zustand owns only small device-side state.
- AsyncStorage persists last-good config and taken-dose state.
- API calls must go through the typed API service.
- Mock behaviour must be behind the same API interface as a future real backend.
- Unknown home-section types must safely render nothing.
- Section-specific item payloads must be runtime validated.
- Avoid business logic inside visual components.
- Avoid circular imports.
- Do not create large generic utility files.

## Performance

- Use FlashList for long or horizontal data-heavy collections where appropriate.
- Use Reanimated for scroll-linked animations.
- Avoid creating animated values during render.
- Memoize only when measurement or render behaviour justifies it.
- Avoid anonymous heavy render functions inside lists.
- Test important flows on Android.

## Agent workflow

Before changing code, an agent must:

1. Read AGENTS.md.
2. Read the relevant file under docs/ai.
3. Inspect existing implementation.
4. State which files it plans to change.
5. Keep the change limited to the requested phase.

After changing code, an agent must:

1. Run TypeScript checking.
2. Run linting.
3. Run relevant tests.
4. Report failures honestly.
5. Update AI_LOG.md.
6. Suggest a commit message.
7. Never create a Git commit unless explicitly asked.
