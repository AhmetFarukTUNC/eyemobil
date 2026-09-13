import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Boş alan kontrolü
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in your name, email and message."
      );
      return;
    }

    // Basit email kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://10.220.214.1:5194/api/Contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("API Error:", data);

        Alert.alert(
          "Error",
          "Your message could not be sent. Please try again."
        );

        return;
      }

      Alert.alert(
        "Message Sent",
        "Thank you for contacting EyeAI. We will get back to you soon."
      );

      // Formu temizle
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log("Contact API Error:", error);

      Alert.alert(
        "Connection Error",
        "Could not connect to the EyeAI server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

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
            <Ionicons
              name="mail-outline"
              size={22}
              color="#1769E0"
            />
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />

            <Text style={styles.badgeText}>
              GET IN TOUCH
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Let's Build the{"\n"}
            <Text style={styles.heroBlue}>
              Future Together.
            </Text>
          </Text>

          <Text style={styles.heroDescription}>
            Have a question, suggestion, or want to learn more
            about EyeAI? Send us a message and our team will get
            back to you.
          </Text>
        </View>

        {/* CONTACT CARDS */}
        <View style={styles.contactCards}>
          <View style={styles.contactCard}>
            <View style={styles.contactIcon}>
              <Ionicons
                name="mail-outline"
                size={21}
                color="#1769E0"
              />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                EMAIL
              </Text>

              <Text style={styles.contactValue}>
                support@eyeai.com
              </Text>
            </View>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactIcon}>
              <Ionicons
                name="time-outline"
                size={21}
                color="#1769E0"
              />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                RESPONSE TIME
              </Text>

              <Text style={styles.contactValue}>
                Within 24 hours
              </Text>
            </View>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.formSection}>
          <Text style={styles.sectionEyebrow}>
            SEND A MESSAGE
          </Text>

          <Text style={styles.sectionTitle}>
            How can we help?
          </Text>

          <Text style={styles.sectionDescription}>
            Fill out the form below and tell us what you have in mind.
          </Text>

          {/* NAME */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              FULL NAME
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={19}
                color="#8A96A8"
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                placeholderTextColor="#A5AFBD"
                style={styles.input}
              />
            </View>
          </View>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              EMAIL ADDRESS
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={19}
                color="#8A96A8"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#A5AFBD"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          {/* SUBJECT */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              SUBJECT
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="chatbubble-outline"
                size={19}
                color="#8A96A8"
              />

              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="How can we help?"
                placeholderTextColor="#A5AFBD"
                style={styles.input}
              />
            </View>
          </View>

          {/* MESSAGE */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              MESSAGE
            </Text>

            <View style={styles.messageWrapper}>
              <Ionicons
                name="create-outline"
                size={19}
                color="#8A96A8"
                style={styles.messageIcon}
              />

              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Write your message..."
                placeholderTextColor="#A5AFBD"
                multiline
                textAlignVertical="top"
                style={styles.messageInput}
              />
            </View>
          </View>

          {/* BUTTON */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
              loading && styles.submitButtonLoading,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />

                <Text style={styles.loadingText}>
                  Sending...
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.submitButtonText}>
                  Send Message
                </Text>

                <View style={styles.buttonIcon}>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#1769E0"
                  />
                </View>
              </>
            )}
          </Pressable>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="sparkles-outline"
              size={22}
              color="#1769E0"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Building smarter healthcare
            </Text>

            <Text style={styles.infoText}>
              EyeAI combines artificial intelligence, computer
              vision, and modern software technologies to create
              a smarter medical image analysis experience.
            </Text>
          </View>
        </View>

        {/* DISCLAIMER */}
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#7A8799"
          />

          <Text style={styles.disclaimerText}>
            EyeAI provides AI-assisted analysis and is not a
            substitute for professional medical diagnosis,
            clinical judgment, or advice from a qualified
            healthcare professional.
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
    marginBottom: 27,
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
    fontSize: 37,
    lineHeight: 42,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -1.4,
  },

  heroBlue: {
    color: "#1769E0",
  },

  heroDescription: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 23,
    color: "#657287",
  },

  /* CONTACT CARDS */

  contactCards: {
    marginBottom: 35,
  },

  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  contactIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  contactInfo: {
    flex: 1,
  },

  contactLabel: {
    fontSize: 8,
    color: "#1769E0",
    fontWeight: "800",
    letterSpacing: 1,
  },

  contactValue: {
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "700",
    marginTop: 4,
  },

  /* FORM */

  formSection: {
    marginBottom: 30,
  },

  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#1769E0",
    marginBottom: 9,
  },

  sectionTitle: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.7,
  },

  sectionDescription: {
    marginTop: 9,
    marginBottom: 22,
    color: "#657287",
    fontSize: 13,
    lineHeight: 21,
  },

  inputContainer: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#657287",
    letterSpacing: 0.8,
    marginBottom: 7,
  },

  inputWrapper: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E8F0",
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#0B1F3A",
    fontSize: 13,
  },

  messageWrapper: {
    minHeight: 130,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E8F0",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  messageIcon: {
    marginTop: 2,
  },

  messageInput: {
    flex: 1,
    marginLeft: 10,
    color: "#0B1F3A",
    fontSize: 13,
    lineHeight: 20,
    minHeight: 100,
  },

  /* BUTTON */

  submitButton: {
    height: 58,
    backgroundColor: "#1769E0",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  submitButtonPressed: {
    opacity: 0.85,
  },

  submitButtonLoading: {
    opacity: 0.9,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginRight: 10,
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 10,
  },

  buttonIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* INFO */

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 21,
    padding: 17,
    marginBottom: 27,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#0B1F3A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoText: {
    color: "#657287",
    fontSize: 11,
    lineHeight: 17,
  },

  /* DISCLAIMER */

  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
    marginBottom: 28,
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

