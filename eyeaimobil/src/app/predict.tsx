
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "http://10.220.214.1:5194";

export default function Predict() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "">("");
  const [previousDiseases, setPreviousDiseases] = useState("");
  const [medications, setMedications] = useState("");

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState("eye-image.jpg");
  const [imageType, setImageType] = useState("image/jpeg");

  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);

  // --------------------------------------------------
  // Convert image to JPEG
  // --------------------------------------------------
  const prepareImage = async (uri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      return result.uri;
    } catch (error) {
      console.log("Image conversion error:", error);
      throw new Error("Could not prepare the image.");
    }
  };

  // --------------------------------------------------
  // Pick image from gallery
  // --------------------------------------------------
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const asset = result.assets[0];

      const jpegUri = await prepareImage(asset.uri);

      setImageUri(jpegUri);
      setImageName(`eye-image-${Date.now()}.jpg`);
      setImageType("image/jpeg");

      setPrediction(null);
      setConfidence(null);
    } catch (error) {
      console.log("Pick image error:", error);

      Alert.alert(
        "Error",
        "Could not select the image."
      );
    }
  };

  // --------------------------------------------------
  // Take photo
  // --------------------------------------------------
  const takePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow camera access."
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const asset = result.assets[0];

      const jpegUri = await prepareImage(asset.uri);

      setImageUri(jpegUri);
      setImageName(`eye-camera-${Date.now()}.jpg`);
      setImageType("image/jpeg");

      setPrediction(null);
      setConfidence(null);
    } catch (error) {
      console.log("Camera error:", error);

      Alert.alert(
        "Error",
        "Could not take the photo."
      );
    }
  };

  // --------------------------------------------------
  // Analyze image
  // --------------------------------------------------
  const handleAnalyze = async () => {
    if (!fullName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter the patient's full name."
      );
      return;
    }

    if (!age.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter the patient's age."
      );
      return;
    }

    if (!gender) {
      Alert.alert(
        "Missing Information",
        "Please select the patient's gender."
      );
      return;
    }

    if (!imageUri) {
      Alert.alert(
        "Missing Image",
        "Please select or capture an eye image."
      );
      return;
    }

    try {
      setLoading(true);
      setPrediction(null);
      setConfidence(null);

      const userId =
        await AsyncStorage.getItem("userId");

      if (!userId) {
        Alert.alert(
          "Authentication Error",
          "Please login again."
        );
        return;
      }

      console.log("===============================");
      console.log("SENDING PREDICTION REQUEST");
      console.log("===============================");
      console.log("UserId:", userId);
      console.log("FullName:", fullName);
      console.log("Age:", age);
      console.log("Gender:", gender);
      console.log("Image URI:", imageUri);
      console.log("Image Name:", imageName);
      console.log("Image Type:", imageType);

      // --------------------------------------------------
      // XMLHttpRequest
      // This avoids the Expo FormDataPart implementation
      // error that occurs with fetch + FormData.
      // --------------------------------------------------

      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        `${API_URL}/api/Prediction`
      );

      xhr.setRequestHeader(
        "Accept",
        "application/json"
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        console.log(
          "HTTP STATUS:",
          xhr.status
        );

        console.log(
          "BACKEND RESPONSE:",
          xhr.responseText
        );

        if (
          xhr.status >= 200 &&
          xhr.status < 300
        ) {
          try {
            const data =
              JSON.parse(xhr.responseText);

            console.log(
              "PREDICTION RESULT:",
              data
            );

            setPrediction(data.disease);
            setConfidence(data.confidence);

            Alert.alert(
              "Analysis Complete",
              `Prediction: ${data.disease}\nConfidence: ${data.confidence}`
            );
          } catch (error) {
            console.log(
              "JSON parse error:",
              error
            );

            Alert.alert(
              "Error",
              "Invalid response received from server."
            );
          }

          setLoading(false);
        } else {
          console.log(
            "Prediction request failed:",
            xhr.responseText
          );

          Alert.alert(
            "Prediction Error",
            xhr.responseText ||
              `Server error: ${xhr.status}`
          );

          setLoading(false);
        }
      };

      xhr.onerror = () => {
        console.log(
          "Network error while sending prediction."
        );

        Alert.alert(
          "Network Error",
          "Could not connect to the EyeAI server."
        );

        setLoading(false);
      };

      xhr.ontimeout = () => {
        console.log(
          "Prediction request timed out."
        );

        Alert.alert(
          "Timeout",
          "The prediction request took too long."
        );

        setLoading(false);
      };

      xhr.timeout = 120000;

      // --------------------------------------------------
      // Create multipart FormData
      // --------------------------------------------------

      const formData = new FormData();

      formData.append(
        "UserId",
        String(userId)
      );

      formData.append(
        "FullName",
        String(fullName)
      );

      formData.append(
        "Age",
        String(age)
      );

      formData.append(
        "Gender",
        String(gender)
      );

      formData.append(
        "PreviousDiseases",
        String(previousDiseases || "")
      );

      formData.append(
        "Medications",
        String(medications || "")
      );

      formData.append(
        "Image",
        {
          uri: imageUri,
          name:
            imageName ||
            "eye-image.jpg",
          type:
            imageType ||
            "image/jpeg",
        } as any
      );

      console.log(
        "FormData prepared."
      );

      console.log(
        "Sending multipart request..."
      );

      xhr.send(formData);
    } catch (error) {
      console.log(
        "Prediction error:",
        error
      );

      Alert.alert(
        "Prediction Error",
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );

      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="scan-outline"
              size={28}
              color="#1769E0"
            />
          </View>

          <View>
            <Text style={styles.title}>
              Eye Analysis
            </Text>

            <Text style={styles.subtitle}>
              AI-powered eye disease detection
            </Text>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Patient Information
          </Text>

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter patient's full name"
            placeholderTextColor="#9AA4B2"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>
            Age
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter age"
            placeholderTextColor="#9AA4B2"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Gender
          </Text>

          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Male" &&
                  styles.genderButtonActive,
              ]}
              onPress={() =>
                setGender("Male")
              }
            >
              <Ionicons
                name="male-outline"
                size={20}
                color={
                  gender === "Male"
                    ? "#FFFFFF"
                    : "#1769E0"
                }
              />

              <Text
                style={[
                  styles.genderText,
                  gender === "Male" &&
                    styles.genderTextActive,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Female" &&
                  styles.genderButtonActive,
              ]}
              onPress={() =>
                setGender("Female")
              }
            >
              <Ionicons
                name="female-outline"
                size={20}
                color={
                  gender === "Female"
                    ? "#FFFFFF"
                    : "#1769E0"
                }
              />

              <Text
                style={[
                  styles.genderText,
                  gender === "Female" &&
                    styles.genderTextActive,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>
            Previous Diseases
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            placeholder="Enter previous diseases"
            placeholderTextColor="#9AA4B2"
            value={previousDiseases}
            onChangeText={
              setPreviousDiseases
            }
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>
            Medications
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            placeholder="Enter current medications"
            placeholderTextColor="#9AA4B2"
            value={medications}
            onChangeText={setMedications}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Image */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Eye Image
          </Text>

          {imageUri ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: imageUri,
                }}
                style={styles.previewImage}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setImageUri(null);
                  setPrediction(null);
                  setConfidence(null);
                }}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="eye-outline"
                size={50}
                color="#1769E0"
              />

              <Text
                style={
                  styles.placeholderTitle
                }
              >
                Upload Eye Image
              </Text>

              <Text
                style={
                  styles.placeholderText
                }
              >
                Select an image from your
                gallery or take a photo
              </Text>
            </View>
          )}

          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={pickImage}
            >
              <Ionicons
                name="images-outline"
                size={20}
                color="#1769E0"
              />

              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={takePhoto}
            >
              <Ionicons
                name="camera-outline"
                size={20}
                color="#1769E0"
              />

              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Analyze */}
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            loading &&
              styles.analyzeButtonDisabled,
          ]}
          onPress={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.analyzeButtonText
                }
              >
                Analyzing...
              </Text>
            </>
          ) : (
            <>
              <Ionicons
                name="sparkles-outline"
                size={22}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.analyzeButtonText
                }
              >
                Analyze with AI
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Result */}
        {prediction && (
          <View style={styles.resultCard}>
            <View
              style={styles.resultHeader}
            >
              <View
                style={
                  styles.resultIcon
                }
              >
                <Ionicons
                  name="checkmark-circle"
                  size={28}
                  color="#1769E0"
                />
              </View>

              <View>
                <Text
                  style={
                    styles.resultTitle
                  }
                >
                  Analysis Result
                </Text>

                <Text
                  style={
                    styles.resultSubtitle
                  }
                >
                  AI prediction completed
                </Text>
              </View>
            </View>

            <View
              style={styles.resultDivider}
            />

            <Text
              style={styles.resultLabel}
            >
              Detected Condition
            </Text>

            <Text
              style={styles.resultDisease}
            >
              {prediction}
            </Text>

            <Text
              style={styles.resultLabel}
            >
              Confidence
            </Text>

            <Text
              style={styles.resultConfidence}
            >
              {confidence}
            </Text>
          </View>
        )}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#718096"
          />

          <Text
            style={styles.disclaimerText}
          >
            This AI analysis is for
            informational purposes only and
            should not replace professional
            medical advice.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#718096",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0B1F3A",
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#344054",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0B1F3A",
    backgroundColor: "#FAFBFD",
  },

  textArea: {
    height: 90,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  genderRow: {
    flexDirection: "row",
    gap: 10,
  },

  genderButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#D8E2F0",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
  },

  genderButtonActive: {
    backgroundColor: "#1769E0",
    borderColor: "#1769E0",
  },

  genderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1769E0",
  },

  genderTextActive: {
    color: "#FFFFFF",
  },

  imageWrapper: {
    position: "relative",
    marginBottom: 14,
  },

  previewImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#EEF2F7",
  },

  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0B1F3A",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePlaceholder: {
    height: 220,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#B8C7DA",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#FAFBFD",
  },

  placeholderTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  placeholderText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#718096",
  },

  imageButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  secondaryButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#C9D8ED",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F8FBFF",
  },

  secondaryButtonText: {
    color: "#1769E0",
    fontSize: 14,
    fontWeight: "700",
  },

  analyzeButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1769E0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
    shadowColor: "#1769E0",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },

  analyzeButtonDisabled: {
    opacity: 0.65,
  },

  analyzeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#DCE8F8",
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  resultTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  resultSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#718096",
  },

  resultDivider: {
    height: 1,
    backgroundColor: "#E8ECF2",
    marginVertical: 18,
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#718096",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 8,
  },

  resultDisease: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0B1F3A",
    marginTop: 5,
    marginBottom: 8,
  },

  resultConfidence: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1769E0",
    marginTop: 5,
  },

  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
    marginBottom: 20,
  },

  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 17,
    color: "#718096",
  },
});

