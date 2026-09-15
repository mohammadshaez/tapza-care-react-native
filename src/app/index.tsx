import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View accessibilityRole="header" style={styles.container}>
        <Text accessibilityRole="header" style={styles.title}>
          Tapza Care
        </Text>
        <Text style={styles.subtitle}>Foundation ready</Text>
        <Text style={styles.body}>
          The patient-care experience is being prepared.
        </Text>
      </View>
    </SafeAreaView>
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    maxWidth: 420,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  body: {
    textAlign: "center",
  },
});
