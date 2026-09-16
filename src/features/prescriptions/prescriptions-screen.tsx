import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { format } from "date-fns";
import { type Href, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConfigTabBar } from "@/components/layout/config-tab-bar";
import { AppIcon } from "@/components/primitives/app-icon";
import { usePrescriptions } from "@/features/prescriptions/hooks/use-prescriptions";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { createDoseKey, useDoseTrackerStore } from "@/store/dose-tracker.store";
import { useAppTheme } from "@/theme/use-app-theme";
import type { AppTheme } from "@/theme/theme.types";
import type {
  Medicine,
  MedicineTiming,
  Prescription,
} from "@/types/prescription";

const timings: MedicineTiming[] = ["morning", "afternoon", "night"];

const timingLabels: Record<MedicineTiming, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  night: "Night",
};

export function PrescriptionsScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const prescriptionsQuery = usePrescriptions();

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<
    string | null
  >(null);

  const selectedPrescription = prescriptionsQuery.data?.find(
    (prescription) => prescription.id === selectedPrescriptionId,
  );

  if (selectedPrescription) {
    return (
      <PrescriptionDetail
        prescription={selectedPrescription}
        theme={theme}
        onBack={() => setSelectedPrescriptionId(null)}
      />
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Prescriptions
        </Text>

        <Text style={styles.description}>
          Your prescriptions and medicine schedules in one place.
        </Text>

        {prescriptionsQuery.isPending ? (
          <PrescriptionSkeleton theme={theme} />
        ) : null}

        {prescriptionsQuery.error ? (
          <View style={styles.stateBox}>
            <Text accessibilityRole="alert" style={styles.errorText}>
              {prescriptionsQuery.error.message}
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                void prescriptionsQuery.refetch();
              }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {!prescriptionsQuery.isPending &&
        !prescriptionsQuery.error &&
        prescriptionsQuery.data?.length === 0 ? (
          <View style={styles.emptyState}>
            <AppIcon
              color={theme.colors.primary}
              name="clipboard-list"
              size={36}
            />

            <Text style={styles.sectionTitle}>No prescriptions yet</Text>

            <Text style={styles.description}>
              Prescriptions from your clinic visits will appear here.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/bookings" as Href)}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Book a consultation</Text>
            </Pressable>
          </View>
        ) : null}

        {!prescriptionsQuery.error
          ? prescriptionsQuery.data?.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
                theme={theme}
                onPress={() => setSelectedPrescriptionId(prescription.id)}
              />
            ))
          : null}

        <PrescriptionMockControls
          queryRefetch={() => {
            void prescriptionsQuery.refetch();
          }}
          theme={theme}
        />
      </ScrollView>

      <ConfigTabBar activeScreen="prescriptions" />
    </SafeAreaView>
  );
}

type PrescriptionCardProps = {
  prescription: Prescription;
  theme: AppTheme;
  onPress: () => void;
};

function PrescriptionCard({
  prescription,
  theme,
  onPress,
}: PrescriptionCardProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open prescription from ${prescription.doctorName}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIcon}>
          <AppIcon
            color={theme.colors.primary}
            name="clipboard-list"
            size={24}
          />
        </View>

        <View style={styles.cardCopy}>
          <Text style={styles.cardTitle}>{prescription.doctorName}</Text>

          <Text style={styles.description}>{prescription.clinicName}</Text>
        </View>

        <AppIcon
          color={theme.colors.textSecondary}
          name="chevron-right"
          size={22}
        />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.metaText}>
          {format(new Date(prescription.issuedAt), "d MMM yyyy")}
        </Text>

        <Text style={styles.metaText}>
          {prescription.medicines.length} medicines
        </Text>
      </View>
    </Pressable>
  );
}

type PrescriptionDetailProps = {
  prescription: Prescription;
  theme: AppTheme;
  onBack: () => void;
};

function PrescriptionDetail({
  prescription,
  theme,
  onBack,
}: PrescriptionDetailProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  const today = format(new Date(), "yyyy-MM-dd");

  const takenDoses = useDoseTrackerStore((state) => state.takenDoses);

  const toggleDose = useDoseTrackerStore((state) => state.toggleDose);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to prescriptions"
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Text accessibilityRole="header" style={styles.title}>
          Medicine schedule
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>{prescription.doctorName}</Text>

          <Text style={styles.description}>{prescription.clinicName}</Text>

          <Text style={styles.metaText}>
            Issued {format(new Date(prescription.issuedAt), "d MMM yyyy")}
          </Text>
        </View>

        {timings.map((timing) => {
          const medicines = prescription.medicines.filter((medicine) =>
            medicine.timing.includes(timing),
          );

          if (medicines.length === 0) {
            return null;
          }

          return (
            <View key={timing} style={styles.scheduleSection}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>
                {timingLabels[timing]}
              </Text>

              {medicines.map((medicine) => {
                const doseIdentity = {
                  prescriptionId: prescription.id,
                  medicineId: medicine.id,
                  timing,
                  date: today,
                };

                const isTaken = Boolean(
                  takenDoses[createDoseKey(doseIdentity)],
                );

                return (
                  <MedicineDoseRow
                    key={`${medicine.id}:${timing}`}
                    isTaken={isTaken}
                    medicine={medicine}
                    theme={theme}
                    onToggle={() => toggleDose(doseIdentity)}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>

      <ConfigTabBar activeScreen="prescriptions" />
    </SafeAreaView>
  );
}

type MedicineDoseRowProps = {
  medicine: Medicine;
  isTaken: boolean;
  theme: AppTheme;
  onToggle: () => void;
};

function MedicineDoseRow({
  medicine,
  isTaken,
  theme,
  onToggle,
}: MedicineDoseRowProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={`${medicine.name}, ${medicine.dose}`}
      accessibilityState={{
        checked: isTaken,
      }}
      onPress={onToggle}
      style={[styles.medicineRow, isTaken && styles.takenMedicineRow]}
    >
      <View style={styles.medicineCopy}>
        <Text style={styles.cardTitle}>{medicine.name}</Text>

        <Text style={styles.description}>
          {medicine.dose} · {medicine.days} days
        </Text>
      </View>

      <View style={[styles.checkbox, isTaken && styles.checkedCheckbox]}>
        {isTaken ? (
          <AppIcon color={theme.colors.onPrimary} name="check" size={20} />
        ) : null}
      </View>
    </Pressable>
  );
}

function PrescriptionSkeleton({ theme }: { theme: AppTheme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      accessibilityLabel="Loading prescriptions"
      style={styles.skeletonGroup}
    >
      {[0, 1, 2].map((key) => (
        <View key={key} style={styles.skeletonCard}>
          <View style={styles.skeletonTitle} />

          <View style={styles.skeletonLine} />

          <View style={styles.skeletonLineShort} />
        </View>
      ))}
    </View>
  );
}

type PrescriptionMockControlsProps = {
  queryRefetch: () => void;
  theme: AppTheme;
};

function PrescriptionMockControls({
  queryRefetch,
  theme,
}: PrescriptionMockControlsProps) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  const emptyPrescriptions = useMockControlsStore(
    (state) => state.emptyPrescriptions,
  );

  const failPrescriptions = useMockControlsStore(
    (state) => state.failPrescriptions,
  );

  const toggleEmptyPrescriptions = useMockControlsStore(
    (state) => state.toggleEmptyPrescriptions,
  );

  const toggleFailPrescriptions = useMockControlsStore(
    (state) => state.toggleFailPrescriptions,
  );

  return (
    <View style={styles.developerPanel}>
      <Text style={styles.metaText}>Mock controls</Text>

      <View style={styles.controlRow}>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{
            checked: emptyPrescriptions,
          }}
          onPress={() => {
            toggleEmptyPrescriptions();
            queryRefetch();
          }}
          style={[
            styles.controlButton,
            emptyPrescriptions && styles.activeControl,
          ]}
        >
          <Text
            style={[
              styles.controlText,
              emptyPrescriptions && styles.activeControlText,
            ]}
          >
            Empty
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="switch"
          accessibilityState={{
            checked: failPrescriptions,
          }}
          onPress={() => {
            toggleFailPrescriptions();
            queryRefetch();
          }}
          style={[
            styles.controlButton,
            failPrescriptions && styles.activeControl,
          ]}
        >
          <Text
            style={[
              styles.controlText,
              failPrescriptions && styles.activeControlText,
            ]}
          >
            Failure
          </Text>
        </Pressable>
      </View>
    </View>
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
    sectionTitle: {
      ...theme.typography.subtitle,
      color: theme.colors.textPrimary,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    card: {
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
      elevation: theme.elevation.md,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    cardIcon: {
      width: theme.sizes.minimumTapTarget,
      height: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.secondary,
    },
    cardCopy: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    cardTitle: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    metaText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    emptyState: {
      minHeight: 260,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.xl,
    },
    stateBox: {
      minHeight: 180,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.md,
    },
    errorText: {
      ...theme.typography.body,
      color: theme.colors.error,
      textAlign: "center",
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
    backButton: {
      minHeight: theme.sizes.minimumTapTarget,
      alignSelf: "flex-start",
      justifyContent: "center",
      paddingHorizontal: theme.spacing.md,
    },
    backButtonText: {
      ...theme.typography.body,
      color: theme.colors.primary,
    },
    summaryCard: {
      gap: theme.spacing.xs,
      padding: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
    },
    scheduleSection: {
      gap: theme.spacing.sm,
    },
    medicineRow: {
      minHeight: 76,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
    },
    takenMedicineRow: {
      opacity: 0.72,
    },
    medicineCopy: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    checkbox: {
      width: theme.sizes.minimumTapTarget,
      height: theme.sizes.minimumTapTarget,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.textSecondary,
      borderRadius: theme.radii.md,
    },
    checkedCheckbox: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    skeletonGroup: {
      gap: theme.spacing.md,
    },
    skeletonCard: {
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
    },
    skeletonTitle: {
      width: "65%",
      height: 20,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.secondary,
    },
    skeletonLine: {
      width: "90%",
      height: 14,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.secondary,
      opacity: 0.7,
    },
    skeletonLineShort: {
      width: "42%",
      height: 14,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.secondary,
      opacity: 0.7,
    },
    developerPanel: {
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
    },
    controlRow: {
      flexDirection: "row",
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
    pressed: {
      opacity: 0.75,
    },
  });
}
