import { useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
    
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              EYE<Text style={styles.brandBlue}>AI</Text>
            </Text>

            <Text style={styles.headerSubtitle}>
              Intelligent Vision Platform
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="eye-outline" size={23} color="#1769E0" />
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>AI-POWERED HEALTHCARE</Text>
          </View>

          <Text style={styles.heroTitle}>
            See Beyond.{"\n"}
            <Text style={styles.heroBlue}>Analyze Smarter.</Text>
          </Text>

          <Text style={styles.heroDescription}>
            EyeAI combines artificial intelligence and computer vision to
            transform medical image analysis into a faster, smarter, and more
            accessible experience.
          </Text>
        </View>

        {/* AI VISUAL */}
        <View style={styles.aiCard}>
          <View style={styles.aiCardTop}>
            <View>
              <Text style={styles.aiLabel}>AI ANALYSIS</Text>
              <Text style={styles.aiTitle}>Vision Intelligence</Text>
            </View>

            <View style={styles.aiStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.eyeContainer}>
            <View style={styles.outerEye}>
              <View style={styles.middleEye}>
                <View style={styles.innerEye}>
                  <View style={styles.pupil}>
                    <View style={styles.pupilHighlight} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.scanLine} />
          </View>

          <View style={styles.confidenceCard}>
            <View>
              <Text style={styles.confidenceLabel}>
                ANALYSIS CONFIDENCE
              </Text>

              <Text style={styles.confidenceValue}>98.7%</Text>
            </View>

            <View style={styles.confidenceIcon}>
              <Ionicons
                name="checkmark-circle"
                size={28}
                color="#1769E0"
              />
            </View>
          </View>
        </View>

        {/* MISSION */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>OUR MISSION</Text>

          <Text style={styles.sectionTitle}>
            Technology designed to{" "}
            <Text style={styles.blueText}>support better decisions.</Text>
          </Text>

          <Text style={styles.sectionDescription}>
            EyeAI is built around a simple idea: advanced artificial
            intelligence should be understandable, accessible, and useful.
            Our platform helps organize medical images and AI-generated
            insights within a modern digital experience.
          </Text>
        </View>

        {/* FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>WHY EYEAI</Text>

          <Text style={styles.sectionTitle}>
            Intelligence at every step.
          </Text>

          <View style={styles.featureGrid}>
            <FeatureCard
              icon="scan-outline"
              title="AI Image Analysis"
              description="Analyze medical images using modern computer vision and machine learning technologies."
            />

            <FeatureCard
              icon="analytics-outline"
              title="Clear Predictions"
              description="Present AI-generated predictions and confidence information through a simple interface."
            />

            <FeatureCard
              icon="people-outline"
              title="Patient Management"
              description="Keep patient information and analysis history organized in one centralized platform."
            />

            <FeatureCard
              icon="shield-checkmark-outline"
              title="Designed for Trust"
              description="Built with a strong focus on clarity, privacy, usability, and responsible AI."
            />
          </View>
        </View>

        {/* WORKFLOW */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>

          <Text style={styles.sectionTitle}>
            From image to insight.
          </Text>

          <View style={styles.workflowCard}>
            <WorkflowStep
              number="01"
              icon="cloud-upload-outline"
              title="Upload"
              description="Add the medical image you want to analyze."
            />

            <View style={styles.verticalLine} />

            <WorkflowStep
              number="02"
              icon="hardware-chip-outline"
              title="Analyze"
              description="AI models process the image and identify relevant patterns."
            />

            <View style={styles.verticalLine} />

            <WorkflowStep
              number="03"
              icon="bulb-outline"
              title="Understand"
              description="Review the generated prediction and confidence information."
            />
          </View>
        </View>

        {/* TECHNOLOGY */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>TECHNOLOGY</Text>

          <Text style={styles.sectionTitle}>
            Built with modern technology.
          </Text>

          <View style={styles.techGrid}>
            <TechItem
              icon="logo-react"
              title="React Native"
              subtitle="Mobile Experience"
            />

            <TechItem
              icon="server-outline"
              title="ASP.NET Core"
              subtitle="Web API"
            />

            <TechItem
              icon="hardware-chip-outline"
              title="AI / ML"
              subtitle="Intelligent Analysis"
            />

            <TechItem
              icon="eye-outline"
              title="Computer Vision"
              subtitle="Image Processing"
            />
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaCard}>
          <View style={styles.ctaIcon}>
            <Ionicons name="sparkles-outline" size={25} color="#FFFFFF" />
          </View>

          <Text style={styles.ctaTitle}>
            The future of vision starts here.
          </Text>

          <Text style={styles.ctaDescription}>
            Explore EyeAI and experience how artificial intelligence can
            transform medical image analysis.
          </Text>

          <Pressable
  style={styles.ctaButton}
  onPress={() => router.push("/")}
>
  <Text style={styles.ctaButtonText}>Explore EyeAI</Text>

  <Ionicons
    name="arrow-forward"
    size={18}
    color="#0B1F3A"
  />
</Pressable>
        </View>

        {/* DISCLAIMER */}
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#7A8799"
          />

          <Text style={styles.disclaimerText}>
            EyeAI provides AI-assisted analysis and is not a substitute for
            professional medical diagnosis, clinical judgment, or advice from
            a qualified healthcare professional.
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            EYE<Text style={styles.brandBlue}>AI</Text>
          </Text>

          <Text style={styles.footerText}>
            Intelligent vision. Smarter healthcare.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={22} color="#1769E0" />
      </View>

      <Text style={styles.featureTitle}>{title}</Text>

      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

/* =========================
   WORKFLOW STEP
========================= */

function WorkflowStep({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.workflowStep}>
      <View style={styles.workflowIcon}>
        <Ionicons name={icon} size={21} color="#1769E0" />
      </View>

      <View style={styles.workflowContent}>
        <Text style={styles.workflowNumber}>{number}</Text>

        <Text style={styles.workflowTitle}>{title}</Text>

        <Text style={styles.workflowDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

/* =========================
   TECHNOLOGY ITEM
========================= */

function TechItem({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.techItem}>
      <View style={styles.techIcon}>
        <Ionicons name={icon} size={21} color="#1769E0" />
      </View>

      <Text style={styles.techTitle}>{title}</Text>

      <Text style={styles.techSubtitle}>{subtitle}</Text>
    </View>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  brand: {
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#0B1F3A",
  },

  brandBlue: {
    color: "#1769E0",
  },

  headerSubtitle: {
    fontSize: 11,
    color: "#7A8799",
    marginTop: 2,
    fontWeight: "500",
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E7EBF2",
  },

  /* HERO */

  hero: {
    marginBottom: 28,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 100,
    marginBottom: 16,
  },

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1769E0",
    marginRight: 7,
  },

  badgeText: {
    color: "#1769E0",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  heroTitle: {
    fontSize: 39,
    lineHeight: 43,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -1.5,
  },

  heroBlue: {
    color: "#1769E0",
  },

  heroDescription: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 24,
    color: "#657287",
  },

  /* AI CARD */

  aiCard: {
    backgroundColor: "#0B1F3A",
    borderRadius: 28,
    padding: 20,
    marginBottom: 38,
    overflow: "hidden",
  },

  aiCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  aiLabel: {
    color: "#7FAEFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  aiTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  aiStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 100,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#54D58C",
    marginRight: 5,
  },

  statusText: {
    color: "#B8C8DE",
    fontSize: 8,
    fontWeight: "800",
  },

  eyeContainer: {
    height: 205,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  outerEye: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "rgba(102,168,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  middleEye: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: "rgba(102,168,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  innerEye: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#1769E0",
    alignItems: "center",
    justifyContent: "center",
  },

  pupil: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#07162A",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 9,
  },

  pupilHighlight: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    opacity: 0.85,
  },

  scanLine: {
    position: "absolute",
    width: 165,
    height: 1,
    backgroundColor: "#67A7FF",
    opacity: 0.45,
  },

  confidenceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 17,
    padding: 14,
  },

  confidenceLabel: {
    color: "#8EA1BB",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
  },

  confidenceValue: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 2,
  },

  confidenceIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* SECTIONS */

  section: {
    marginBottom: 38,
  },

  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#1769E0",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.7,
  },

  blueText: {
    color: "#1769E0",
  },

  sectionDescription: {
    marginTop: 13,
    color: "#657287",
    fontSize: 14,
    lineHeight: 23,
  },

  /* FEATURES */

  featureGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    minHeight: 185,
  },

  featureIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  featureTitle: {
    color: "#0B1F3A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 7,
  },

  featureDescription: {
    color: "#7A8799",
    fontSize: 11,
    lineHeight: 17,
  },

  /* WORKFLOW */

  workflowCard: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  workflowStep: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  workflowIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  workflowContent: {
    flex: 1,
  },

  workflowNumber: {
    color: "#1769E0",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  workflowTitle: {
    color: "#0B1F3A",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },

  workflowDescription: {
    color: "#7A8799",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  verticalLine: {
    width: 1,
    height: 25,
    backgroundColor: "#DCE3ED",
    marginLeft: 21,
    marginVertical: 5,
  },

  /* TECHNOLOGY */

  techGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  techItem: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  techIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },

  techTitle: {
    color: "#0B1F3A",
    fontSize: 13,
    fontWeight: "800",
  },

  techSubtitle: {
    color: "#8A96A8",
    fontSize: 10,
    marginTop: 4,
  },

  /* CTA */

  ctaCard: {
    backgroundColor: "#1769E0",
    borderRadius: 26,
    padding: 23,
    marginBottom: 25,
  },

  ctaIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  ctaTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  ctaDescription: {
    color: "#D9E8FF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  ctaButton: {
    marginTop: 19,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  ctaButtonText: {
    color: "#0B1F3A",
    fontSize: 13,
    fontWeight: "800",
    marginRight: 8,
  },

  /* DISCLAIMER */

  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
    marginBottom: 30,
  },

  disclaimerText: {
    flex: 1,
    color: "#8A96A8",
    fontSize: 10,
    lineHeight: 16,
    marginLeft: 8,
  },

  /* FOOTER */

  footer: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 15,
  },

  footerBrand: {
    color: "#0B1F3A",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  footerText: {
    color: "#9AA5B5",
    fontSize: 10,
    marginTop: 5,
  },
});

