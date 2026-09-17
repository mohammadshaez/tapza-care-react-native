import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Href, useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  ReduceMotion,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ConfigTabBar } from "@/components/layout/config-tab-bar";
import {
  getHomeHeaderHeight,
  HomeHeader,
} from "@/features/home/components/home-header";
import type { HomeAction } from "@/features/home/home-section.types";
import { useDoctors } from "@/features/home/hooks/use-doctors";
import { HomeSectionRenderer } from "@/features/home/sections/home-section-renderer";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { LayoutConfigSection } from "@/types/config";

export function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const { theme, config, isLoading, error, retry } = useAppTheme();

  const doctorsQuery = useDoctors();

  const styles = useMemo(
    () => createStyles(theme, getHomeHeaderHeight(theme, insets.top)),
    [theme, insets.top],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const openBookings = useCallback(
    (doctorId?: string) => {
      const route = doctorId
        ? `/bookings?doctorId=${encodeURIComponent(doctorId)}`
        : "/bookings";

      router.push(route as Href);
    },
    [router],
  );

  const handleAction = useCallback(
    (action: HomeAction, doctorId?: string) => {
      if (action === "prescriptions") {
        router.push("/prescriptions" as Href);
        return;
      }

      openBookings(doctorId);
    },
    [openBookings, router],
  );

  const doctorState = useMemo(
    () => ({
      doctors: doctorsQuery.data ?? [],
      isLoading: doctorsQuery.isPending,
      error:
        doctorsQuery.error instanceof Error ? doctorsQuery.error.message : null,
      retry: () => {
        void doctorsQuery.refetch();
      },
    }),
    [
      doctorsQuery.data,
      doctorsQuery.error,
      doctorsQuery.isPending,
      doctorsQuery.refetch,
    ],
  );

  const renderSection = useCallback(
    ({ item, index }: { item: LayoutConfigSection; index: number }) => (
      <Animated.View
        entering={FadeInDown.delay(Math.min(index, 3) * theme.motion.fast)
          .duration(theme.motion.normal)
          .reduceMotion(ReduceMotion.System)}
      >
        <HomeSectionRenderer
          doctorState={doctorState}
          onAction={handleAction}
          onBook={openBookings}
          scrollY={scrollY}
          section={item}
        />
      </Animated.View>
    ),
    [
      doctorState,
      handleAction,
      openBookings,
      scrollY,
      theme.motion.fast,
      theme.motion.normal,
    ],
  );

  return (
    <View style={styles.screen}>
      <HomeHeader
        greeting={config.theme.festival.greeting}
        scrollY={scrollY}
        topInset={insets.top}
      />

      <Animated.FlatList
        data={config.sections}
        initialNumToRender={2}
        keyExtractor={(section) => section.id}
        onRefresh={() => {
          void retry();
        }}
        onScroll={scrollHandler}
        refreshing={isLoading}
        removeClippedSubviews
        renderItem={renderSection}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          error ? (
            <View style={styles.warning}>
              <Text accessibilityRole="alert" style={styles.warningText}>
                Showing saved information. {error}
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  void retry();
                }}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          ) : null
        }
      />

      <ConfigTabBar activeScreen="home" />
    </View>
  );
}

function createStyles(theme: AppTheme, headerHeight: number) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContent: {
      paddingTop: headerHeight,
    },
    warning: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.secondary,
    },
    warningText: {
      ...theme.typography.bodySmall,
      flex: 1,
      color: theme.colors.onSecondary,
    },
    retryButton: {
      minHeight: theme.sizes.minimumTapTarget,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.md,
    },
    retryText: {
      ...theme.typography.body,
      color: theme.colors.onSecondary,
    },
  });
}
