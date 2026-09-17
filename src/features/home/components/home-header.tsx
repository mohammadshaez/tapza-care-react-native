import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";

import { useAppTheme } from "@/theme/use-app-theme";
import { useMockControlsStore } from "@/store/mock-controls.store";
import type { AppTheme } from "@/theme/theme.types";

type HomeHeaderProps = {
  scrollY: SharedValue<number>;
  greeting: string;
  topInset?: number;
};

const EXPANDED_HEIGHT = 112;
const COLLAPSED_HEIGHT = 72;

export function getHomeHeaderHeight(_theme: AppTheme, topInset = 0) {
  return EXPANDED_HEIGHT + topInset;
}

export function HomeHeader({
  scrollY,
  greeting,
  topInset = 0,
}: HomeHeaderProps) {
  const { theme } = useAppTheme();
  const reduceMotion = useReducedMotion();

  const configMode = useMockControlsStore((state) => state.configMode);
  const setConfigMode = useMockControlsStore((state) => state.setConfigMode);

  const isFestivalMode = configMode === "diwali";

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const progress = reduceMotion
      ? 0
      : interpolate(scrollY.value, [0, 96], [0, 1], "clamp");

    return {
      height: interpolate(
        progress,
        [0, 1],
        [EXPANDED_HEIGHT + topInset, COLLAPSED_HEIGHT + topInset],
      ),
    };
  });

  const greetingAnimatedStyle = useAnimatedStyle(() => {
    if (reduceMotion) {
      return {
        opacity: 1,
        transform: [{ translateY: 0 }],
      };
    }

    return {
      opacity: interpolate(scrollY.value, [0, 52], [1, 0], "clamp"),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 52], [0, -8], "clamp"),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.textSecondary,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: topInset,
        },
        headerAnimatedStyle,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text
            maxFontSizeMultiplier={1.4}
            style={[
              styles.appName,
              {
                color: theme.colors.primary,
                fontSize: theme.typography.title.fontSize,
                lineHeight: theme.typography.title.lineHeight,
              },
            ]}
          >
            Tapza Care
          </Text>

          <Animated.Text
            numberOfLines={1}
            maxFontSizeMultiplier={1.4}
            style={[
              styles.greeting,
              {
                color: theme.colors.textSecondary,
                fontSize: theme.typography.body.fontSize,
                lineHeight: theme.typography.body.lineHeight,
              },
              greetingAnimatedStyle,
            ]}
          >
            {greeting}
          </Animated.Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isFestivalMode ? "Switch to normal theme" : "Switch to Diwali theme"
          }
          onPress={() => setConfigMode(isFestivalMode ? "normal" : "diwali")}
          style={({ pressed }) => [
            styles.switchButton,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radii.xl,
              opacity: pressed ? 0.8 : 1,
              paddingHorizontal: theme.spacing.md,
            },
          ]}
        >
          <Text
            maxFontSizeMultiplier={1.3}
            style={[
              styles.switchText,
              {
                color: theme.colors.onPrimary,
                fontSize: theme.typography.bodySmall.fontSize,
                lineHeight: theme.typography.bodySmall.lineHeight,
              },
            ]}
          >
            {isFestivalMode ? "Normal" : "Diwali"}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 20,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  appName: {
    fontWeight: "800",
  },
  greeting: {
    marginTop: 2,
  },
  switchButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    minWidth: 72,
  },
  switchText: {
    fontWeight: "700",
  },
});
