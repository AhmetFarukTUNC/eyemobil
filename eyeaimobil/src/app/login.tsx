
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Information", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://10.220.214.1:5194/api/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid email or password."
        );
        return;
      }

      // Backend'den gelen UserId
      const user = data.user;

      await AsyncStorage.setItem("userId", user.id.toString());
      await AsyncStorage.setItem("username", user.username);
      await AsyncStorage.setItem("email", user.email);

      Alert.alert("Success", "Login successful!");

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Could not connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              EYE<Text style={styles.logoBlue}>AI</Text>
            </Text>

            <View style={styles.iconCircle}>
              <Ionicons name="eye-outline" size={32} color="#1769E0" />
            </View>
          </View>

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue to EyeAI.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#8A96A8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#A0AAB8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#8A96A8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A0AAB8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color="#8A96A8"
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>

              {!loading && (
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#FFFFFF"
                />
              )}
            </Pressable>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>
                Don't have an account?
              </Text>

              <Pressable onPress={() => router.push("/signup")}>
                <Text style={styles.signupLink}> Sign Up</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            EyeAI provides AI-assisted analysis and does not replace
            professional medical diagnosis.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 35,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    fontSize: 25,
    fontWeight: "900",
    color: "#0B1F3A",
    letterSpacing: 2,
  },

  logoBlue: {
    color: "#1769E0",
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#718096",
    marginBottom: 30,
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 8,
  },

  inputContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E1E6ED",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#FAFBFD",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0B1F3A",
  },

  loginButton: {
    height: 56,
    backgroundColor: "#1769E0",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 5,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  signupText: {
    fontSize: 14,
    color: "#718096",
  },

  signupLink: {
    fontSize: 14,
    color: "#1769E0",
    fontWeight: "700",
  },

  disclaimer: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 11,
    lineHeight: 17,
    color: "#8A96A8",
  },
});

