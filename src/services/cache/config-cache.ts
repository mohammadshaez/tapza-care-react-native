import AsyncStorage from "@react-native-async-storage/async-storage";

import { LayoutConfigSchema } from "@/config/schemas/config";
import { normalConfig } from "@/services/mock/fixtures/config.normal";
import type { LayoutConfig } from "@/types/config";

const LAST_GOOD_CONFIG_KEY = "tapza-care:last-good-config:v1";

export type ConfigSource = "cached" | "bundled";

export type ConfigCacheState = {
  config: LayoutConfig;
  source: ConfigSource;
  warning: string | null;
};

function getBundledConfig(): LayoutConfig {
  return LayoutConfigSchema.parse(normalConfig);
}

export async function readLastGoodConfig(): Promise<ConfigCacheState> {
  try {
    const storedValue = await AsyncStorage.getItem(LAST_GOOD_CONFIG_KEY);

    if (!storedValue) {
      return {
        config: getBundledConfig(),
        source: "bundled",
        warning: null,
      };
    }

    const untrustedConfig = JSON.parse(storedValue) as unknown;
    const result = LayoutConfigSchema.safeParse(untrustedConfig);

    if (!result.success) {
      await AsyncStorage.removeItem(LAST_GOOD_CONFIG_KEY);

      return {
        config: getBundledConfig(),
        source: "bundled",
        warning: "The stored configuration was invalid and has been cleared.",
      };
    }

    return {
      config: result.data,
      source: "cached",
      warning: null,
    };
  } catch {
    return {
      config: getBundledConfig(),
      source: "bundled",
      warning: "The stored configuration could not be read.",
    };
  }
}

export async function writeLastGoodConfig(
  untrustedConfig: unknown,
): Promise<LayoutConfig> {
  const config = LayoutConfigSchema.parse(untrustedConfig);

  await AsyncStorage.setItem(LAST_GOOD_CONFIG_KEY, JSON.stringify(config));

  return config;
}

export async function clearLastGoodConfig(): Promise<void> {
  await AsyncStorage.removeItem(LAST_GOOD_CONFIG_KEY);
}
