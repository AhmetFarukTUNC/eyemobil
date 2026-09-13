
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>EyeAI</Text>
          <Text style={styles.logoSubtitle}>SMART EYE ANALYSIS</Text>
        </View>

        
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <View style={styles.aiBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.aiBadgeText}>
            AI-POWERED ANALYSIS
          </Text>
        </View>

        <Text style={styles.heroTitle}>
          See Beyond.{"\n"}
          <Text style={styles.heroTitleBlue}>
            Analyze Smarter.
          </Text>
        </Text>

        <Text style={styles.heroDescription}>
          Advanced artificial intelligence for retinal image
          analysis and intelligent eye disease prediction.
        </Text>
      </View>

      {/* RETINA VISUAL */}
      <View style={styles.visualContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <View style={styles.innerCircle}>
              <View style={styles.pupil}>
                <View style={styles.pupilGlow} />
              </View>
            </View>
          </View>
        </View>

        {/* AI CARD */}
        <View style={styles.aiCard}>
          <View style={styles.aiCardIcon}>
            <Text style={styles.aiCardIconText}>✦</Text>
          </View>

          <View>
            <Text style={styles.aiCardTitle}>
              AI Analysis
            </Text>

            <Text style={styles.aiCardSubtitle}>
              Ready to analyze
            </Text>
          </View>
        </View>

        {/* CONFIDENCE CARD */}
        <View style={styles.confidenceCard}>
          <Text style={styles.confidenceValue}>
            98%
          </Text>

          <Text style={styles.confidenceText}>
            AI Confidence
          </Text>
        </View>
      </View>

      {/* MAIN ACTION */}
      <Pressable
        style={({ pressed }) => [
          styles.predictButton,
          pressed && styles.predictButtonPressed,
        ]}
        onPress={() => router.push("/predict")}
      >
        <View>
          <Text style={styles.predictButtonTitle}>
            Start Prediction
          </Text>

          <Text style={styles.predictButtonSubtitle}>
            Analyze a retinal image
          </Text>
        </View>

        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>
            →
          </Text>
        </View>
      </Pressable>

      {/* QUICK ACCESS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>
      </View>

      <View style={styles.quickActions}>
        {/* NEW PREDICTION */}
        <Pressable
          style={({ pressed }) => [
            styles.quickCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push("/predict")}
        >
          <View style={styles.quickIconBlue}>
            <Text style={styles.quickIconText}>
              +
            </Text>
          </View>

          <Text style={styles.quickTitle}>
            New Prediction
          </Text>

          <Text style={styles.quickDescription}>
            Analyze a new retinal image
          </Text>
        </Pressable>

        {/* PATIENTS */}
        <Pressable
          style={({ pressed }) => [
            styles.quickCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push("/patients")}
        >
          <View style={styles.quickIconPurple}>
            <Text style={styles.quickIconText}>
              ◌
            </Text>
          </View>

          <Text style={styles.quickTitle}>
            Patients
          </Text>

          <Text style={styles.quickDescription}>
            View patient history
          </Text>
        </Pressable>
      </View>

      {/* HOW IT WORKS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          How EyeAI Works
        </Text>
      </View>

      {/* STEP 1 */}
      <View style={styles.stepCard}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>
            01
          </Text>
        </View>

        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            Upload
          </Text>

          <Text style={styles.stepDescription}>
            Add a retinal image to begin the analysis.
          </Text>
        </View>
      </View>

      {/* STEP 2 */}
      <View style={styles.stepCard}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>
            02
          </Text>
        </View>

        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            Analyze
          </Text>

          <Text style={styles.stepDescription}>
            Our AI model processes the retinal image.
          </Text>
        </View>
      </View>

      {/* STEP 3 */}
      <View style={styles.stepCard}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>
            03
          </Text>
        </View>

        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            Results
          </Text>

          <Text style={styles.stepDescription}>
            Review the prediction and confidence score.
          </Text>
        </View>
      </View>

      {/* DISCLAIMER */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>
          Medical AI Decision Support
        </Text>

        <Text style={styles.disclaimerText}>
          EyeAI is designed to support retinal image analysis.
          It does not replace professional medical diagnosis.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 45,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 38,
  },

  logo: {
    fontSize: 29,
    fontWeight: "800",
    color: "#0A1930",
    letterSpacing: -1,
  },

  logoSubtitle: {
    fontSize: 8,
    fontWeight: "700",
    color: "#6B7A90",
    letterSpacing: 1.5,
    marginTop: 2,
  },

  profileButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3E9F2",
  },

  profileButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  /* HERO */

  hero: {
    marginBottom: 25,
  },

  aiBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 17,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#1769E0",
    marginRight: 7,
  },

  aiBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1769E0",
    letterSpacing: 1,
  },

  heroTitle: {
    fontSize: 39,
    lineHeight: 44,
    fontWeight: "800",
    color: "#0A1930",
    letterSpacing: -1.2,
  },

  heroTitleBlue: {
    color: "#1769E0",
  },

  heroDescription: {
    marginTop: 17,
    fontSize: 15,
    lineHeight: 23,
    color: "#718096",
    maxWidth: 350,
  },

  /* RETINA */

  visualContainer: {
    height: 285,
    backgroundColor: "#0A1930",
    borderRadius: 30,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },

  outerCircle: {
    width: 205,
    height: 205,
    borderRadius: 103,
    borderWidth: 1,
    borderColor: "#31527C",
    justifyContent: "center",
    alignItems: "center",
  },

  middleCircle: {
    width: 165,
    height: 165,
    borderRadius: 83,
    borderWidth: 1,
    borderColor: "#3E6FA8",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: "#1769E0",
    justifyContent: "center",
    alignItems: "center",
  },

  pupil: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#071426",
    justifyContent: "center",
    alignItems: "center",
  },

  pupilGlow: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#5AA2FF",
    opacity: 0.8,
  },

  /* AI CARD */

  aiCard: {
    position: "absolute",
    top: 20,
    left: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  aiCardIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  aiCardIconText: {
    color: "#1769E0",
    fontSize: 16,
  },

  aiCardTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0A1930",
  },

  aiCardSubtitle: {
    fontSize: 9,
    color: "#7C8899",
    marginTop: 2,
  },

  /* CONFIDENCE */

  confidenceCard: {
    position: "absolute",
    right: 18,
    bottom: 20,
    backgroundColor: "#132945",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  confidenceValue: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  confidenceText: {
    color: "#8EA4BF",
    fontSize: 9,
    marginTop: 2,
  },

  /* PREDICT BUTTON */

  predictButton: {
    height: 72,
    backgroundColor: "#1769E0",
    borderRadius: 20,
    paddingHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  predictButtonPressed: {
    opacity: 0.85,
  },

  predictButtonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  predictButtonSubtitle: {
    color: "#C8DEFF",
    fontSize: 11,
    marginTop: 4,
  },

  arrowContainer: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#1769E0",
    fontSize: 23,
    fontWeight: "600",
  },

  /* SECTIONS */

  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0A1930",
  },

  /* QUICK ACCESS */

  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
  },

  cardPressed: {
    opacity: 0.8,
  },

  quickIconBlue: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  quickIconPurple: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#F0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  quickIconText: {
    fontSize: 21,
    color: "#1769E0",
    fontWeight: "600",
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0A1930",
  },

  quickDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#7B8798",
    marginTop: 5,
  },

  /* HOW IT WORKS */

  stepCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5EAF2",
  },

  stepNumber: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  stepNumberText: {
    color: "#1769E0",
    fontSize: 11,
    fontWeight: "800",
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0A1930",
    marginBottom: 3,
  },

  stepDescription: {
    fontSize: 12,
    color: "#7B8798",
    lineHeight: 18,
  },

  /* DISCLAIMER */

  disclaimer: {
    marginTop: 20,
    backgroundColor: "#EEF2F7",
    borderRadius: 17,
    padding: 17,
  },

  disclaimerTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#42526A",
    marginBottom: 6,
  },

  disclaimerText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#718096",
  },
});

