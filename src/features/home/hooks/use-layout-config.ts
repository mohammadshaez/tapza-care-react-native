import { useQuery } from "@tanstack/react-query";

import { LayoutConfigSchema } from "@/config/schemas/config";
import {
  readLastGoodConfig,
  writeLastGoodConfig,
  type ConfigSource,
} from "@/services/cache/config-cache";
import { mockApiClient } from "@/services/mock/mock-api-client";
import { queryKeys } from "@/services/query/query-keys";
import {
  useMockControlsStore,
  type ConfigMode,
} from "@/store/mock-controls.store";
import type { LayoutConfig } from "@/types/config";

export type LayoutConfigSource = ConfigSource | "fresh";

export type LayoutConfigResult = {
  config: LayoutConfig;
  source: LayoutConfigSource;
  warning: string | null;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Unable to refresh the application configuration.";
}

async function resolveLayoutConfig(): Promise<LayoutConfigResult> {
  const cachedResult = await readLastGoodConfig();

  try {
    const remoteConfig = await mockApiClient.getConfig();
    const validatedConfig = LayoutConfigSchema.parse(remoteConfig);

    await writeLastGoodConfig(validatedConfig);

    return {
      config: validatedConfig,
      source: "fresh",
      warning: null,
    };
  } catch (error: unknown) {
    return {
      config: cachedResult.config,
      source: cachedResult.source,
      warning: getErrorMessage(error),
    };
  }
}

export function useLayoutConfig() {
  const configMode = useMockControlsStore((state) => state.configMode);

  return useQuery<
    LayoutConfigResult,
    Error,
    LayoutConfigResult,
    readonly ["tapza-care", "config", ConfigMode]
  >({
    queryKey: queryKeys.config(configMode),
    queryFn: resolveLayoutConfig,
    staleTime: 60 * 1000,
  });
}
