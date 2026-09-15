import AsyncStorage from "@react-native-async-storage/async-storage";

import { LayoutConfigSchema } from "@/config/schemas/config";
import { normalConfig } from "@/services/mock/fixtures/config.normal";

const LAST_GOOD_CONFIG_KEY = "tapza-care:last-good-config:v1";

export type ConfigCacheState = {
  config: unknown;
  source: "cached" | "bundled" | "fresh";
  error: string | null;
};

export async function readLastGoodConfig(): Promise<ConfigCacheState> {
  try {
    const raw = await AsyncStorage.getItem(LAST_GOOD_CONFIG_KEY);
    if (!raw) {
      return { config: normalConfig, source: "bundled", error: null };
    }

    const json = JSON.parse(raw) as unknown;
    const parsed = LayoutConfigSchema.safeParse(json);
    if (!parsed.success) {
      await AsyncStorage.removeItem(LAST_GOOD_CONFIG_KEY);
      return {
        config: normalConfig,
        source: "bundled",
        error: "Stored config is invalid.",
      };
    }

    return { config: parsed.data, source: "cached", error: null };
  } catch {
    return {
      config: normalConfig,
      source: "bundled",
      error: "Unable to read cached config.",
    };
  }
}

export async function writeLastGoodConfig(config: unknown): Promise<void> {
  const parsed = LayoutConfigSchema.safeParse(config);
  if (!parsed.success) {
    return;
  }

  await AsyncStorage.setItem(LAST_GOOD_CONFIG_KEY, JSON.stringify(parsed.data));
}

export async function clearLastGoodConfig(): Promise<void> {
  await AsyncStorage.removeItem(LAST_GOOD_CONFIG_KEY);
}
