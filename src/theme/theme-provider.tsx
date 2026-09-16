import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import {
  useLayoutConfig,
  type LayoutConfigSource,
} from "@/features/home/hooks/use-layout-config";
import { normalConfig } from "@/services/mock/fixtures/config.normal";
import { createTheme } from "@/theme/create-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { LayoutConfig } from "@/types/config";

export type ThemeContextValue = {
  theme: AppTheme;
  config: LayoutConfig;
  configSource: LayoutConfigSource;
  isFallback: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const configQuery = useLayoutConfig();

  const config = configQuery.data?.config ?? normalConfig;
  const configSource = configQuery.data?.source ?? "bundled";
  const error = configQuery.data?.warning ?? configQuery.error?.message ?? null;

  const theme = useMemo(() => createTheme(config), [config]);

  const retry = useCallback(async () => {
    await configQuery.refetch();
  }, [configQuery]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      config,
      configSource,
      isFallback: configSource !== "fresh",
      isLoading: configQuery.isPending,
      error,
      retry,
    }),
    [theme, config, configSource, configQuery.isPending, error, retry],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider.");
  }

  return context;
}
