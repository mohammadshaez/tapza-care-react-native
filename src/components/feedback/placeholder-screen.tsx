import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConfigTabBar } from "@/components/layout/config-tab-bar";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { AppScreen } from "@/types/config";

type PlaceholderScreenProps = {
  activeScreen: AppScreen;
  title: string;
  message: string;
};

export function PlaceholderScreen({
  activeScreen,
  title,
  message,
}: PlaceholderScreenProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>

        <Text style={styles.message}>{message}</Text>
      </View>

      <ConfigTabBar activeScreen={activeScreen} />
    </SafeAreaView>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.xxl,
    },
    title: {
      ...theme.typography.title,
      color: theme.colors.textPrimary,
      textAlign: "center",
    },
    message: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
  });
}
