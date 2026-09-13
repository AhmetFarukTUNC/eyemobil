
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
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://10.220.214.1:5194/api/Auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Registration Failed",
          data.message || "Registration failed."
        );
        return;
      }

      Alert.alert(
        "Success",
        "Your account has been created successfully.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/login"),
          },
        ]
      );
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
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color="#0B1F3A"
            />
          </Pressable>

          <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              EYE<Text style={styles.logoBlue}>AI</Text>
            </Text>
          </View>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Start your journey with EyeAI.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#8A96A8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#A0AAB8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

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
                placeholder="Create a password"
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
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupButtonText}>
                {loading ? "Creating Account..." : "Create Account"}
              </Text>

              {!loading && (
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#FFFFFF"
                />
              )}
            </Pressable>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() => router.push("/login")}
              >
                <Text style={styles.loginLink}> Sign In</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            By creating an account, you agree to use EyeAI as an
            AI-assisted medical analysis tool.
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
    paddingTop: 20,
    paddingBottom: 35,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
    marginBottom: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
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

  title: {
    fontSize: 31,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#718096",
    marginBottom: 28,
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

  signupButton: {
    height: 56,
    backgroundColor: "#1769E0",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 5,
  },

  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  loginText: {
    fontSize: 14,
    color: "#718096",
  },

  loginLink: {
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

