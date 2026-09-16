import { useMemo, type PropsWithChildren } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { parseGradient } from "@/config/schemas/gradient";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { SectionBackground } from "@/types/config";

type SectionBandProps = PropsWithChildren<{
  background: SectionBackground;
  contentStyle?: ViewStyle;
}>;

export function SectionBand({
  background,
  contentStyle,
  children,
}: SectionBandProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const content = (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  if (background.kind === "gradient") {
    const gradient = parseGradient(background.value);

    if (!gradient.success) {
      return <View style={styles.fallback}>{content}</View>;
    }

    return (
      <LinearGradient colors={gradient.value} style={styles.band}>
        {content}
      </LinearGradient>
    );
  }

  if (background.kind === "image") {
    return (
      <View style={styles.fallback}>
        <Image
          accessibilityIgnoresInvertColors
          contentFit="cover"
          source={background.value}
          style={styles.backgroundImage}
          transition={150}
        />

        <View style={styles.imageOverlay} />

        {content}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.band,
        {
          backgroundColor: background.value,
        },
      ]}
    >
      {content}
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    band: {
      width: "100%",
    },
    fallback: {
      width: "100%",
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
    },
    backgroundImage: {
      ...StyleSheet.absoluteFill,
    },
    imageOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: theme.colors.surface,
      opacity: 0.84,
    },
    content: {
      width: "100%",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
    },
  });
}
