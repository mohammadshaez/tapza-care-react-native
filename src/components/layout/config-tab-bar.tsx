import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Href, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppIcon } from "@/components/primitives/app-icon";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { AppScreen } from "@/types/config";

const routeByScreen: Record<AppScreen, Href> = {
  home: "/" as Href,
  bookings: "/bookings" as Href,
  prescriptions: "/prescriptions" as Href,
  profile: "/profile" as Href,
};

type ConfigTabBarProps = {
  activeScreen: AppScreen;
};

export function ConfigTabBar({ activeScreen }: ConfigTabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, config } = useAppTheme();

  const styles = useMemo(
    () => createStyles(theme, insets.bottom),
    [theme, insets.bottom],
  );

  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {config.tabs.map((tab) => {
        const isActive = tab.screen === activeScreen;

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{
              selected: isActive,
            }}
            accessibilityLabel={tab.label}
            onPress={() => {
              if (!isActive) {
                router.replace(routeByScreen[tab.screen]);
              }
            }}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            <AppIcon
              color={
                isActive ? theme.colors.primary : theme.colors.textSecondary
              }
              name={tab.icon}
              size={22}
            />

            <Text
              numberOfLines={1}
              style={[styles.label, isActive && styles.activeLabel]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles(theme: AppTheme, bottomInset: number) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
      minHeight: theme.sizes.minimumTapTarget + theme.spacing.lg + bottomInset,
      paddingBottom: bottomInset,
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondary,
      backgroundColor: theme.colors.surface,
    },
    tab: {
      flex: 1,
      minWidth: theme.sizes.minimumTapTarget,
      minHeight: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
    },
    label: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    activeLabel: {
      color: theme.colors.primary,
      fontWeight: "700",
    },
    pressed: {
      opacity: 0.7,
    },
  });
}
