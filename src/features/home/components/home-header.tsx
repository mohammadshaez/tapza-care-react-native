import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";

type HomeHeaderProps = {
  scrollY: SharedValue<number>;
  greeting: string;
};

export function getHomeHeaderHeight(theme: AppTheme, topInset: number): number {
  return topInset + theme.sizes.minimumTapTarget + theme.spacing.xxl;
}

export function HomeHeader({ scrollY, greeting }: HomeHeaderProps) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();

  const expandedHeight = getHomeHeaderHeight(theme, insets.top);

  const collapsedHeight =
    insets.top + theme.sizes.minimumTapTarget + theme.spacing.sm;

  const styles = useMemo(
    () => createStyles(theme, insets.top),
    [theme, insets.top],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const progress = reduceMotion
      ? 1
      : interpolate(
          scrollY.value,
          [0, expandedHeight],
          [0, 1],
          Extrapolation.CLAMP,
        );

    return {
      height: interpolate(progress, [0, 1], [expandedHeight, collapsedHeight]),
    };
  });

  const greetingStyle = useAnimatedStyle(() => ({
    opacity: reduceMotion
      ? 0
      : interpolate(
          scrollY.value,
          [0, theme.spacing.xxl * 2],
          [1, 0],
          Extrapolation.CLAMP,
        ),
    transform: [
      {
        translateY: reduceMotion
          ? 0
          : interpolate(
              scrollY.value,
              [0, theme.spacing.xxl * 2],
              [0, -theme.spacing.md],
              Extrapolation.CLAMP,
            ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.appName}>
          Tapza Care
        </Text>

        <Animated.Text
          numberOfLines={1}
          style={[styles.greeting, greetingStyle]}
        >
          {greeting}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

function createStyles(theme: AppTheme, topInset: number) {
  return StyleSheet.create({
    header: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 10,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
      elevation: theme.elevation.md,
    },
    content: {
      flex: 1,
      justifyContent: "flex-end",
      paddingTop: topInset,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    appName: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
    },
    greeting: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
  });
}
