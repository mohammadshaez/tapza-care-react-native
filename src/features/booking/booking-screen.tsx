import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { addDays, format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  FadeIn,
  ReduceMotion,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConfigTabBar } from "@/components/layout/config-tab-bar";
import { AppIcon } from "@/components/primitives/app-icon";
import { useCreateBooking } from "@/features/booking/hooks/use-create-booking";
import { useSlots } from "@/features/booking/hooks/use-slots";
import { useDoctors } from "@/features/home/hooks/use-doctors";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import { ApiError } from "@/types/api";
import type { Slot } from "@/types/slot";

type FeedbackState = "idle" | "pending" | "confirmed";

function getParameter(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export function BookingScreen() {
  const parameters = useLocalSearchParams<{
    doctorId?: string | string[];
  }>();

  const requestedDoctorId = getParameter(parameters.doctorId);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const dates = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = addDays(new Date(), index);

        return {
          id: format(date, "yyyy-MM-dd"),
          day: format(date, "EEE"),
          date: format(date, "d MMM"),
        };
      }),
    [],
  );

  const doctorsQuery = useDoctors();

  const [manualDoctorId, setManualDoctorId] = useState<string | null>(
    requestedDoctorId,
  );

  const selectedDoctorId = manualDoctorId ?? doctorsQuery.data?.[0]?.id ?? null;

  const [selectedDate, setSelectedDate] = useState(dates[0]?.id ?? "");

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const [bookingError, setBookingError] = useState<string | null>(null);

  const slotsQuery = useSlots(selectedDoctorId, selectedDate);

  const bookingMutation = useCreateBooking();

  const mockControls = useMockControlsStore();

  const selectedDoctor = doctorsQuery.data?.find(
    (doctor) => doctor.id === selectedDoctorId,
  );

  const selectedSlot = slotsQuery.data?.find(
    (slot) => slot.id === selectedSlotId,
  );

  const openSlots = () => {
    setSelectedSlotId(null);
    setBookingError(null);
    bottomSheetRef.current?.present();
  };

  const confirmBooking = () => {
    if (!selectedDoctorId || !selectedSlotId) {
      return;
    }

    setFeedback("pending");
    setBookingError(null);
    bottomSheetRef.current?.dismiss();

    bookingMutation.mutate(
      {
        doctorId: selectedDoctorId,
        slotId: selectedSlotId,
        date: selectedDate,
      },
      {
        onSuccess: () => {
          setFeedback("confirmed");
        },
        onError: (error: Error) => {
          setFeedback("idle");

          if (error instanceof ApiError && error.status === 409) {
            setBookingError(
              "That time was just booked. Please choose another slot.",
            );
            return;
          }

          setBookingError(error.message || "Booking could not be confirmed.");
        },
      },
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Book an appointment
        </Text>

        <Text style={styles.description}>
          Choose a doctor, date and convenient time.
        </Text>

        <Text style={styles.sectionTitle}>Doctor</Text>

        {doctorsQuery.isPending ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : null}

        {doctorsQuery.error ? (
          <View style={styles.stateBox}>
            <Text style={styles.errorText}>{doctorsQuery.error.message}</Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                void doctorsQuery.refetch();
              }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {!doctorsQuery.isPending &&
        !doctorsQuery.error &&
        doctorsQuery.data?.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.description}>
              No doctors are currently available.
            </Text>
          </View>
        ) : null}

        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        >
          {doctorsQuery.data?.map((doctor) => {
            const isSelected = doctor.id === selectedDoctorId;

            return (
              <Pressable
                key={doctor.id}
                accessibilityRole="button"
                accessibilityState={{
                  selected: isSelected,
                }}
                onPress={() => {
                  setManualDoctorId(doctor.id);
                  setSelectedSlotId(null);
                  setBookingError(null);
                }}
                style={[
                  styles.doctorButton,
                  isSelected && styles.selectedDoctorButton,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.doctorName,
                    isSelected && styles.selectedDoctorText,
                  ]}
                >
                  {doctor.name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={[
                    styles.doctorSpecialty,
                    isSelected && styles.selectedDoctorText,
                  ]}
                >
                  {doctor.specialty}
                </Text>

                <Text
                  style={[
                    styles.doctorSpecialty,
                    isSelected && styles.selectedDoctorText,
                  ]}
                >
                  ₹{doctor.feeInr}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Date</Text>

        <ScrollView
          horizontal
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        >
          {dates.map((date) => {
            const isSelected = date.id === selectedDate;

            return (
              <Pressable
                key={date.id}
                accessibilityRole="button"
                accessibilityState={{
                  selected: isSelected,
                }}
                onPress={() => {
                  setSelectedDate(date.id);
                  setSelectedSlotId(null);
                  setBookingError(null);
                }}
                style={[
                  styles.dateButton,
                  isSelected && styles.selectedDateButton,
                ]}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {date.day}
                </Text>

                <Text
                  style={[
                    styles.dateValue,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {date.date}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {selectedDoctor ? (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>{selectedDoctor.name}</Text>

            <Text style={styles.description}>{selectedDoctor.specialty}</Text>

            <Text style={styles.price}>
              Consultation fee ₹{selectedDoctor.feeInr}
            </Text>
          </View>
        ) : null}

        {bookingError ? (
          <Text accessibilityRole="alert" style={styles.errorText}>
            {bookingError}
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          disabled={!selectedDoctorId}
          onPress={openSlots}
          style={[
            styles.primaryButton,
            !selectedDoctorId && styles.disabledButton,
          ]}
        >
          <Text style={styles.primaryButtonText}>Choose a time</Text>
        </Pressable>

        <View style={styles.developerPanel}>
          <Text style={styles.developerTitle}>Mock controls</Text>

          <View style={styles.controlRow}>
            <ControlButton
              active={mockControls.emptySlots}
              label="Empty"
              onPress={mockControls.toggleEmptySlots}
              theme={theme}
            />

            <ControlButton
              active={mockControls.failSlots}
              label="Fail slots"
              onPress={mockControls.toggleFailSlots}
              theme={theme}
            />

            <ControlButton
              active={mockControls.conflictNextBooking}
              label="409 next"
              onPress={mockControls.triggerNextBookingConflict}
              theme={theme}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              mockControls.setLatencyMs(
                mockControls.latencyMs > 500 ? 300 : 1500,
              );
            }}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>
              Latency: {mockControls.latencyMs} ms
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfigTabBar activeScreen="bookings" />

      <BottomSheetModal
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={["65%"]}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
      >
        <BottomSheetView style={styles.sheetHeader}>
          <Text style={styles.sectionTitle}>Select a time</Text>
        </BottomSheetView>

        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          {slotsQuery.isPending ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : null}

          {slotsQuery.error ? (
            <View style={styles.stateBox}>
              <Text style={styles.errorText}>{slotsQuery.error.message}</Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  void slotsQuery.refetch();
                }}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Retry</Text>
              </Pressable>
            </View>
          ) : null}

          {!slotsQuery.isPending &&
          !slotsQuery.error &&
          slotsQuery.data?.length === 0 ? (
            <View style={styles.stateBox}>
              <Text style={styles.description}>
                No times are available on this date. Please choose another date.
              </Text>
            </View>
          ) : null}

          {slotsQuery.data?.map((slot) => (
            <SlotButton
              key={slot.id}
              selected={slot.id === selectedSlotId}
              slot={slot}
              theme={theme}
              onPress={() => setSelectedSlotId(slot.id)}
            />
          ))}

          {selectedSlot ? (
            <Pressable
              accessibilityRole="button"
              onPress={confirmBooking}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>
                Confirm {format(new Date(selectedSlot.startsAt), "h:mm a")}
              </Text>
            </Pressable>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheetModal>

      {feedback !== "idle" ? (
        <Animated.View
          entering={FadeIn.duration(theme.motion.fast).reduceMotion(
            ReduceMotion.System,
          )}
          style={styles.feedbackOverlay}
        >
          {feedback === "pending" ? (
            <>
              <ActivityIndicator color={theme.colors.primary} size="large" />

              <Text style={styles.summaryTitle}>
                Confirming your appointment…
              </Text>
            </>
          ) : (
            <>
              <Animated.View
                entering={ZoomIn.duration(theme.motion.normal).reduceMotion(
                  ReduceMotion.System,
                )}
                style={styles.successIcon}
              >
                <AppIcon
                  color={theme.colors.onPrimary}
                  name="check"
                  size={36}
                />
              </Animated.View>

              <Text style={styles.title}>Booking confirmed</Text>

              <Text style={styles.description}>
                Your appointment has been added.
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => setFeedback("idle")}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Done</Text>
              </Pressable>
            </>
          )}
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}

type SlotButtonProps = {
  slot: Slot;
  selected: boolean;
  theme: AppTheme;
  onPress: () => void;
};

function SlotButton({ slot, selected, theme, onPress }: SlotButtonProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        disabled: !slot.available,
        selected,
      }}
      disabled={!slot.available}
      onPress={onPress}
      style={[
        styles.slotButton,
        selected && styles.selectedSlot,
        !slot.available && styles.disabledButton,
      ]}
    >
      <Text style={[styles.slotText, selected && styles.selectedSlotText]}>
        {format(new Date(slot.startsAt), "h:mm a")}
      </Text>

      {!slot.available ? (
        <Text style={styles.unavailableText}>Taken</Text>
      ) : null}
    </Pressable>
  );
}

type ControlButtonProps = {
  active: boolean;
  label: string;
  onPress: () => void;
  theme: AppTheme;
};

function ControlButton({ active, label, onPress, theme }: ControlButtonProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{
        checked: active,
      }}
      onPress={onPress}
      style={[styles.controlButton, active && styles.activeControl]}
    >
      <Text style={[styles.controlText, active && styles.activeControlText]}>
        {label}
      </Text>
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      gap: theme.spacing.lg,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.title,
      color: theme.colors.textPrimary,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    sectionTitle: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
    },
    horizontalList: {
      gap: theme.spacing.sm,
      paddingRight: theme.spacing.lg,
    },
    doctorButton: {
      width: 190,
      minHeight: 112,
      justifyContent: "center",
      gap: theme.spacing.xs,
      padding: theme.spacing.md,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
    },
    selectedDoctorButton: {
      backgroundColor: theme.colors.primary,
    },
    doctorName: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    doctorSpecialty: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    selectedDoctorText: {
      color: theme.colors.onPrimary,
    },
    dateButton: {
      minWidth: 72,
      minHeight: 72,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
    },
    selectedDateButton: {
      backgroundColor: theme.colors.primary,
    },
    dateDay: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    dateValue: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    selectedDateText: {
      color: theme.colors.onPrimary,
    },
    summary: {
      gap: theme.spacing.xs,
      padding: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
    },
    summaryTitle: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
      textAlign: "center",
    },
    price: {
      ...theme.typography.body,
      color: theme.colors.primary,
    },
    primaryButton: {
      minHeight: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
    },
    primaryButtonText: {
      ...theme.typography.body,
      color: theme.colors.onPrimary,
    },
    secondaryButton: {
      minHeight: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.secondary,
    },
    secondaryButtonText: {
      ...theme.typography.body,
      color: theme.colors.onSecondary,
    },
    errorText: {
      ...theme.typography.body,
      color: theme.colors.error,
      textAlign: "center",
    },
    stateBox: {
      minHeight: 100,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
    },
    developerPanel: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
    },
    developerTitle: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    controlRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    controlButton: {
      minHeight: theme.sizes.minimumTapTarget,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.secondary,
    },
    controlText: {
      ...theme.typography.bodySmall,
      color: theme.colors.onSecondary,
    },
    activeControl: {
      backgroundColor: theme.colors.primary,
    },
    activeControlText: {
      color: theme.colors.onPrimary,
    },
    sheetBackground: {
      backgroundColor: theme.colors.surface,
    },
    sheetHandle: {
      backgroundColor: theme.colors.textSecondary,
    },
    sheetHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    sheetContent: {
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    slotButton: {
      minHeight: theme.sizes.minimumTapTarget,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.background,
    },
    selectedSlot: {
      backgroundColor: theme.colors.primary,
    },
    slotText: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    selectedSlotText: {
      color: theme.colors.onPrimary,
    },
    unavailableText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    disabledButton: {
      opacity: 0.45,
    },
    feedbackOverlay: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.lg,
      padding: theme.spacing.xxl,
      backgroundColor: theme.colors.background,
    },
    successIcon: {
      width: 72,
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.xl,
      backgroundColor: theme.colors.primary,
    },
  });
}
