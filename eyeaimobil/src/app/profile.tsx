
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedUsername =
        await AsyncStorage.getItem("username");

      const storedEmail =
        await AsyncStorage.getItem("email");

      setUsername(storedUsername || "User");
      setEmail(storedEmail || "No email available");
    } catch (error) {
      console.log("Profile loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userId",
        "username",
        "email",
      ]);

      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);

      Alert.alert(
        "Error",
        "Unable to log out. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#1769E0"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>
            EYE<Text style={styles.brandBlue}>AI</Text>
          </Text>

          <Text style={styles.title}>Profile</Text>

          <Text style={styles.subtitle}>
            Manage your account and preferences.
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={38}
              color="#1769E0"
            />
          </View>

          <Text style={styles.username}>
            {username}
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account Information
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#1769E0"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Username
              </Text>

              <Text style={styles.infoValue}>
                {username}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#1769E0"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Email
              </Text>

              <Text style={styles.infoValue}>
                {email}
              </Text>
            </View>
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <View style={styles.logoutIcon}>
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#D64545"
              />
            </View>

            <View style={styles.logoutContent}>
              <Text style={styles.logoutTitle}>
                Log Out
              </Text>

              <Text style={styles.logoutSubtitle}>
                Sign out from your EyeAI account
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#A0A9B8"
            />
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color="#1769E0"
            />
          </View>

          <Text style={styles.footerText}>
            Your account information is securely
            stored and associated with your account.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 110,
  },

  header: {
    marginBottom: 25,
  },

  brand: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: 1,
    marginBottom: 18,
  },

  brandBlue: {
    color: "#1769E0",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: "#718096",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 26,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  username: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  email: {
    marginTop: 5,
    fontSize: 13,
    color: "#718096",
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0B1F3A",
    marginBottom: 11,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
    marginBottom: 10,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#8A96A8",
    fontWeight: "600",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0DADA",
  },

  logoutIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFF3F3",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutContent: {
    flex: 1,
    marginLeft: 12,
  },

  logoutTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#D64545",
  },

  logoutSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: "#8A96A8",
  },

  footer: {
    marginTop: 25,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#EEF4FF",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  footerIcon: {
    marginTop: 1,
  },

  footerText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    lineHeight: 18,
    color: "#53657D",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

