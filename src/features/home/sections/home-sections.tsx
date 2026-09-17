import { useMemo } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";

import { AppIcon } from "@/components/primitives/app-icon";
import { SectionBand } from "@/components/layout/section-band";
import type {
  CategoryChipItem,
  DoctorCarouselItem,
  HeroBannerItem,
  HomeAction,
  OfferStripItem,
  QuickActionItem,
  ServiceGridItem,
} from "@/features/home/home-section.types";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type { LayoutConfigSection, SectionBackground } from "@/types/config";
import type { Doctor } from "@/types/doctor";

type BaseSectionProps = {
  title: string;
  background: SectionBackground;
};

type ActionHandler = (action: HomeAction, doctorId?: string) => void;

type SectionHeadingProps = {
  title: string;
};

function SectionHeading({ title }: SectionHeadingProps) {
  const { theme } = useAppTheme();

  return (
    <Text
      accessibilityRole="header"
      style={{
        ...theme.typography.subtitle,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.lg,
      }}
    >
      {title}
    </Text>
  );
}

type HeroBannerSectionProps = BaseSectionProps & {
  items: HeroBannerItem[];
  scrollY: SharedValue<number>;
  onAction: ActionHandler;
};

export function HeroBannerSection({
  title,
  background,
  items,
  scrollY,
  onAction,
}: HeroBannerSectionProps) {
  const { theme } = useAppTheme();
  const reduceMotion = useReducedMotion();
  const item = items[0];

  const styles = useMemo(() => createStyles(theme), [theme]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: reduceMotion
          ? 0
          : interpolate(
              scrollY.value,
              [0, 240],
              [0, theme.spacing.xxl],
              Extrapolation.CLAMP,
            ),
      },
    ],
  }));

  if (!item) {
    return null;
  }

  return (
    <SectionBand background={background}>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroGreeting}>{item.greeting}</Text>

          <Text style={styles.heroTitle}>{title}</Text>

          <Text style={styles.description}>{item.description}</Text>

          {item.ctaLabel && item.action ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => onAction(item.action!)}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>{item.ctaLabel}</Text>
            </Pressable>
          ) : null}
        </View>

        <Animated.View style={[styles.heroImageWrap, imageStyle]}>
          <Image
            accessibilityLabel={title}
            contentFit="cover"
            source={item.imageUrl}
            style={styles.heroImage}
            transition={theme.motion.normal}
          />
        </Animated.View>
      </View>
    </SectionBand>
  );
}

type CategoryChipsSectionProps = BaseSectionProps & {
  items: CategoryChipItem[];
};

export function CategoryChipsSection({
  title,
  background,
  items,
}: CategoryChipsSectionProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SectionBand background={background}>
      <SectionHeading title={title} />

      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalContent}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.chip}>
            <AppIcon color={theme.colors.primary} name={item.icon} size={20} />

            <Text style={styles.chipText}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>
    </SectionBand>
  );
}

type QuickActionsSectionProps = BaseSectionProps & {
  items: QuickActionItem[];
  onAction: ActionHandler;
};

export function QuickActionsSection({
  title,
  background,
  items,
  onAction,
}: QuickActionsSectionProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SectionBand background={background}>
      <SectionHeading title={title} />

      <View style={styles.actionGrid}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => onAction(item.action)}
            style={({ pressed }) => [
              styles.actionTile,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.iconCircle}>
              <AppIcon
                color={theme.colors.primary}
                name={item.icon}
                size={24}
              />
            </View>

            <Text numberOfLines={2} style={styles.actionLabel}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SectionBand>
  );
}

type ServiceGridSectionProps = BaseSectionProps & {
  items: ServiceGridItem[];
  onBook: (doctorId?: string) => void;
};

export function ServiceGridSection({
  title,
  background,
  items,
  onBook,
}: ServiceGridSectionProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SectionBand background={background}>
      <SectionHeading title={title} />

      <View style={styles.serviceGrid}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={`Book ${item.name} for ₹${item.priceInr}`}
            onPress={() => onBook(item.doctorId)}
            style={({ pressed }) => [
              styles.serviceCard,
              pressed && styles.pressed,
            ]}
          >
            <Image
              accessibilityLabel={item.name}
              contentFit="cover"
              source={item.imageUrl}
              style={styles.serviceImage}
              transition={theme.motion.fast}
            />

            <View style={styles.serviceContent}>
              {item.badge ? (
                <Text style={styles.badge}>{item.badge}</Text>
              ) : null}

              <Text numberOfLines={2} style={styles.cardTitle}>
                {item.name}
              </Text>

              <Text style={styles.price}>From ₹{item.priceInr}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SectionBand>
  );
}

export type DoctorSectionState = {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

type DoctorCarouselSectionProps = BaseSectionProps & {
  items: DoctorCarouselItem[];
  state: DoctorSectionState;
  onBook: (doctorId: string) => void;
};

export function DoctorCarouselSection({
  title,
  background,
  items,
  state,
  onBook,
}: DoctorCarouselSectionProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const visibleDoctors = items.flatMap((item) => {
    const doctor = state.doctors.find(
      (candidate) => candidate.id === item.doctorId,
    );

    return doctor ? [{ doctor, availability: item.nextAvailableLabel }] : [];
  });

  return (
    <SectionBand background={background}>
      <SectionHeading title={title} />

      {state.isLoading ? (
        <View style={styles.skeletonRow}>
          {[0, 1].map((key) => (
            <View key={key} style={styles.doctorSkeleton} />
          ))}
        </View>
      ) : null}

      {!state.isLoading && state.error ? (
        <View style={styles.stateBox}>
          <Text style={styles.errorText}>{state.error}</Text>

          <Pressable
            accessibilityRole="button"
            onPress={state.retry}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      {!state.isLoading && !state.error && visibleDoctors.length === 0 ? (
        <View style={styles.stateBox}>
          <Text style={styles.description}>
            No doctors are available right now.
          </Text>
        </View>
      ) : null}

      {!state.isLoading && !state.error && visibleDoctors.length > 0 ? (
        <FlatList
          horizontal
          data={visibleDoctors}
          keyExtractor={({ doctor }) => doctor.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Book ${item.doctor.name}`}
              onPress={() => onBook(item.doctor.id)}
              style={({ pressed }) => [
                styles.doctorCard,
                pressed && styles.pressed,
              ]}
            >
              <Image
                accessibilityLabel={item.doctor.name}
                contentFit="cover"
                source={item.doctor.photoUrl}
                style={styles.doctorImage}
                transition={theme.motion.fast}
              />

              <View style={styles.doctorMeta}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {item.doctor.name}
                </Text>

                <Text numberOfLines={1} style={styles.description}>
                  {item.doctor.specialty}
                </Text>

                <Text numberOfLines={1} style={styles.availability}>
                  Next: {item.availability}
                </Text>

                <Text style={styles.price}>₹{item.doctor.feeInr}</Text>
              </View>
            </Pressable>
          )}
        />
      ) : null}
    </SectionBand>
  );
}

type OfferStripSectionProps = BaseSectionProps & {
  items: OfferStripItem[];
};

export function OfferStripSection({
  title,
  background,
  items,
}: OfferStripSectionProps) {
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const offer = items[0];
  const isDarkBackground =
    background.kind === "color" ? isDarkColor(background.value) : false;
  const offerTitleColor = isDarkBackground
    ? theme.colors.onPrimary
    : theme.colors.textPrimary;
  const offerBodyColor = isDarkBackground
    ? theme.colors.onPrimary
    : theme.colors.textSecondary;
  const offerIconColor = isDarkBackground
    ? theme.colors.onPrimary
    : theme.colors.primary;

  if (!offer) {
    return null;
  }

  return (
    <SectionBand background={background}>
      <View style={styles.offer}>
        <View style={styles.offerCopy}>
          <Text style={[styles.offerTitle, { color: offerTitleColor }]}>
            {title}
          </Text>

          <Text style={[styles.description, { color: offerBodyColor }]}>
            {offer.message}
          </Text>
        </View>

        <AppIcon color={offerIconColor} name="chevron-right" size={24} />
      </View>
    </SectionBand>
  );
}

export type SectionComponentProps = {
  section: LayoutConfigSection;
  scrollY: SharedValue<number>;
  doctorState: DoctorSectionState;
  onAction: ActionHandler;
  onBook: (doctorId?: string) => void;
};

function isDarkColor(value: string): boolean {
  const normalized = value.replace("#", "").trim();
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;

  if (hex.length !== 6) {
    return false;
  }

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance < 0.5;
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    hero: {
      minHeight: 220,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      overflow: "hidden",
    },
    heroCopy: {
      flex: 1,
      alignItems: "flex-start",
      gap: theme.spacing.sm,
    },
    heroGreeting: {
      ...theme.typography.body,
      color: theme.colors.primary,
    },
    heroTitle: {
      ...theme.typography.title,
      color: theme.colors.textPrimary,
    },
    description: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    heroImageWrap: {
      width: "36%",
      aspectRatio: 0.8,
      overflow: "hidden",
      borderRadius: theme.radii.lg,
    },
    heroImage: {
      width: "100%",
      height: "100%",
    },
    primaryButton: {
      minHeight: theme.sizes.minimumTapTarget,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
    },
    primaryButtonText: {
      ...theme.typography.body,
      color: theme.colors.onPrimary,
    },
    horizontalContent: {
      gap: theme.spacing.md,
      paddingRight: theme.spacing.lg,
    },
    chip: {
      minHeight: theme.sizes.minimumTapTarget,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.xl,
      backgroundColor: theme.colors.surface,
    },
    chipText: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    actionGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: theme.spacing.sm,
    },
    actionTile: {
      flex: 1,
      minHeight: 104,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
    },
    iconCircle: {
      width: theme.sizes.minimumTapTarget,
      height: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.xl,
      backgroundColor: theme.colors.secondary,
    },
    actionLabel: {
      ...theme.typography.bodySmall,
      color: theme.colors.textPrimary,
      textAlign: "center",
    },
    serviceGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    serviceCard: {
      width: "48%",
      overflow: "hidden",
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
      elevation: theme.elevation.md,
    },
    serviceImage: {
      width: "100%",
      aspectRatio: 1.5,
    },
    serviceContent: {
      gap: theme.spacing.xs,
      padding: theme.spacing.md,
    },
    badge: {
      ...theme.typography.bodySmall,
      alignSelf: "flex-start",
      color: theme.colors.primary,
    },
    cardTitle: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    price: {
      ...theme.typography.body,
      color: theme.colors.primary,
    },
    skeletonRow: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    doctorSkeleton: {
      width: 220,
      height: 240,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.secondary,
      opacity: 0.55,
    },
    stateBox: {
      minHeight: 120,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
    },
    errorText: {
      ...theme.typography.body,
      color: theme.colors.error,
      textAlign: "center",
    },
    secondaryButton: {
      minHeight: theme.sizes.minimumTapTarget,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.secondary,
    },
    secondaryButtonText: {
      ...theme.typography.body,
      color: theme.colors.onSecondary,
    },
    doctorCard: {
      width: 220,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
      elevation: theme.elevation.md,
    },
    doctorImage: {
      width: "100%",
      aspectRatio: 1.45,
    },
    doctorMeta: {
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
    },
    availability: {
      ...theme.typography.bodySmall,
      color: theme.colors.success,
    },
    offer: {
      minHeight: theme.sizes.minimumTapTarget,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    offerCopy: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    offerTitle: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    pressed: {
      opacity: 0.75,
    },
  });
}
