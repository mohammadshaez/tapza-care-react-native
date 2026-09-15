import { useQuery } from "@tanstack/react-query";

import { LayoutConfigSchema } from "@/config/schemas/config";
import {
  readLastGoodConfig,
  writeLastGoodConfig,
} from "@/services/cache/config-cache";
import { mockApiClient } from "@/services/mock/mock-api-client";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { queryKeys } from "@/services/query/query-keys";

export function useLayoutConfig() {
  const configMode = useMockControlsStore((state) => state.configMode);

  return useQuery({
    queryKey: queryKeys.config(configMode),
    queryFn: async () => {
      const cachedState = await readLastGoodConfig();
      const fallbackConfig = cachedState.config;

      try {
        const resolved = await mockApiClient.getConfig();
        const validated = LayoutConfigSchema.parse(resolved);
        await writeLastGoodConfig(validated);
        return validated;
      } catch {
        return LayoutConfigSchema.parse(fallbackConfig);
      }
    },
    staleTime: 60 * 1000,
  });
}
