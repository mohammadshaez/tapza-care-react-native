import React, { createContext, useContext, useMemo, useState } from "react";

import { LayoutConfigSchema } from "@/config/schemas/config";
import { normalConfig } from "@/services/mock/fixtures/config.normal";
import { readLastGoodConfig } from "@/services/cache/config-cache";
import { mockApiClient } from "@/services/mock/mock-api-client";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { createTheme } from "@/theme/create-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { LayoutConfig } from "@/types/config";

export type ThemeContextValue = {
  theme: AppTheme;
  config: LayoutConfig;
  isFallback: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const configMode = useMockControlsStore((state) => state.configMode);
  const [config, setConfig] = useState<LayoutConfig>(normalConfig);
  const [isFallback, setIsFallback] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cached = await readLastGoodConfig();
      const fallback = cached.config as LayoutConfig;
      if (cached.source === "bundled" || cached.source === "cached") {
        setConfig(LayoutConfigSchema.parse(fallback));
        setIsFallback(cached.source !== "fresh");
      }

      const remote = await mockApiClient.getConfig();
      const validRemote = LayoutConfigSchema.parse(remote);
      setConfig(validRemote);
      setIsFallback(false);
      setError(null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to load configuration.";
      setError(message);
      const cached = await readLastGoodConfig();
      setConfig(LayoutConfigSchema.parse(cached.config as LayoutConfig));
      setIsFallback(cached.source !== "fresh");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      void loadConfig();
    }, 0);

    return () => clearTimeout(timer);
  }, [configMode]);

  const theme = useMemo(() => createTheme(config), [config]);
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      config,
      isFallback,
      isLoading,
      error,
      retry: async () => {
        await loadConfig();
      },
    }),
    [theme, config, isFallback, isLoading, error],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
}
