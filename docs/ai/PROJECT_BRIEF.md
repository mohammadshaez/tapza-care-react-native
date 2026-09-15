# Tapza Care project brief

## Product background

Tapza Clinic is clinic software built for doctors in India. After a consultation, patient prescriptions are shared via WhatsApp. Tapza Care is the patient-facing mobile application designed to make prescription follow-ups, appointments, and care coordination feel calm, trustworthy, and fast on mid-range Android devices.

## Target users

- Indian patients and families
- Older users who prefer clear, readable interfaces
- Patients who want prescription tracking without friction
- Users who prefer Hindi or Telugu alongside English where appropriate

## Functional requirements

The final app will contain three major experiences:

1. Config-driven home
   - Fetch GET /config at runtime
   - Render remote theme colours and tab configuration
   - Support ordered sections and runtime switching
   - Handle loading, fallback, empty, and error states
   - Provide background-aware section bands and animations

2. Booking
   - Open from doctor or service flows
   - Choose a date and slot
   - Confirm via optimistic update and reconcile API response
   - Handle 409 slot conflicts gracefully

3. Prescriptions
   - View the prescription list and detail
   - Group medicines by morning, afternoon, and night
   - Persist taken-dose state by date
   - Support reminders and daily completion tracking

## Mock API endpoints and shapes

The app should define a typed API layer behind the same interface as a future real backend. The mock layer may eventually support:

- GET /config
- GET /doctors
- GET /services
- GET /doctor/:id
- GET /service/:id
- GET /slots
- POST /bookings
- GET /prescriptions
- GET /prescriptions/:id

The config response should validate section ordering, theme values, tab entries, and runtime mode metadata. Remote content must be validated with Zod before being used in the UI.

## Accessibility requirements

- Use semantic touch targets of at least 44 points
- Respect OS font scaling
- Maintain readable contrast
- Support reduced-motion preferences where animations are used
- Prefer clear labels and accessible elements over decorative-only UI

## Required tests

- Type-checking with TypeScript
- Linting with Expo ESLint
- Relevant Android-focused flow tests for config, home, and booking behaviour
- Persistence and validation tests where state boundaries are important

## Required submission deliverables

- Working Android build path
- Documentation for architecture and implementation plan
- Screenshots and demo walkthrough materials
- Honest cut-features section in the final README

## Optional bonus features

- Richer Hindi/Telugu localization
- Notification reminders and small user education moments
- Improved reduced-motion polish
- A basic demo-video checklist

## Explicit out-of-scope items

- Native Android/iOS project generation from scratch
- Large-scale generic utilities or framework abstraction beyond the approved architecture
- Full production backend integration in this slice
- Creating credentials, secrets, or personal MCP configuration in the repository
