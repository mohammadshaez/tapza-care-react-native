import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTranslation } from "@/locales/use-translation";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { useAppTheme } from "@/theme/theme-provider";

export default function HomeScreen() {
  const { theme, config, isFallback, isLoading, error, retry } = useAppTheme();
  const { t, i18n } = useTranslation();
  const configMode = useMockControlsStore((state) => state.configMode);
  const setConfigMode = useMockControlsStore((state) => state.setConfigMode);

  return (
    <View
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: theme.colors.textPrimary }]}
        >
          {t("appName")}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {t("foundationReady")}
        </Text>
        <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
          {t("patientCareExperience")}
        </Text>

        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
            {isLoading
              ? t("loading")
              : configMode === "normal"
                ? "Normal"
                : "Diwali"}
          </Text>
          {isFallback ? (
            <Text style={[styles.meta, { color: theme.colors.warning }]}>
              {t("cachedData")}
            </Text>
          ) : null}
          {error ? (
            <Text style={[styles.meta, { color: theme.colors.error }]}>
              {error}
            </Text>
          ) : null}
        </View>

        {error ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void retry()}
            style={[
              styles.button,
              {
                minHeight: theme.sizes.minimumTapTarget,
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.surface }]}>
              {t("retry")}
            </Text>
          </Pressable>
        ) : null}

        <View style={styles.toggleWrap}>
          <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
            {t("developmentControl")}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle configuration mode for development"
            onPress={() =>
              setConfigMode(configMode === "normal" ? "diwali" : "normal")
            }
            style={[
              styles.button,
              {
                minHeight: theme.sizes.minimumTapTarget,
                backgroundColor: theme.colors.secondary,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.surface }]}>
              {configMode === "normal" ? t("normalTheme") : t("diwaliTheme")}
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
          {i18n.language === "hi" ? "Hindi" : "English"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    maxWidth: 420,
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  metaRow: {
    alignItems: "center",
    gap: 8,
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  toggleWrap: {
    alignItems: "center",
    gap: 12,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
