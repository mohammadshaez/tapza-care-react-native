# MCP guidance

- MCP configuration belongs in the developer environment, not inside the React Native app repository.
- MCP must not be imported into the app codebase or bundled as part of the mobile product.
- Expo development and documentation tooling are recommended for local workflow support.
- GitHub integration is useful after the repository is published but is not required during this foundation slice.
- Figma, WhatsApp, database, and OpenAI API integrations are not required for this stage.
- Secrets must be supplied by environment variables or secure developer authentication.
- Do not commit personal OAuth tokens, API keys, or developer-only configuration.
- Do not create .codex/config.toml until the user confirms they are using Codex.
- External tools should receive the minimum permissions needed to complete their task.
