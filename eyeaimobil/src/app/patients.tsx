
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const API_URL = "http://10.220.214.1:5194";

type Prediction = {
  id: number;
  diseaseResult: string;
  confidence: number;
  imagePath: string;
  createdDate: string;
};

type Patient = {
  id: number;
  userId: number;
  fullName: string;
  age: number;
  gender: string;
  previousDiseases: string;
  medications: string;
  predictions: Prediction[];
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setError("");

      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        setError("User session not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/Patient/user/${userId}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message || "Failed to load patients."
        );
      }

      const data = await response.json();

      setPatients(data);
    } catch (error: any) {
      console.log("Patient fetch error:", error);

      setError(
        error?.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPatients();
  };

  const handleDelete = (patient: Patient) => {
    Alert.alert(
      "Delete Patient",
      `Are you sure you want to delete ${patient.fullName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePatient(patient.id),
        },
      ]
    );
  };

  const deletePatient = async (patientId: number) => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        Alert.alert("Error", "User session not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/Patient/${patientId}/user/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to delete patient."
        );
      }

      setPatients((currentPatients) =>
        currentPatients.filter(
          (patient) => patient.id !== patientId
        )
      );

      Alert.alert(
        "Success",
        "Patient deleted successfully."
      );
    } catch (error: any) {
      console.log("Patient delete error:", error);

      Alert.alert(
        "Error",
        error?.message || "Unable to delete patient."
      );
    }
  };

  const getLatestPrediction = (
    predictions: Prediction[]
  ): Prediction | null => {
    if (!predictions || predictions.length === 0) {
      return null;
    }

    return [...predictions].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() -
        new Date(a.createdDate).getTime()
    )[0];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatConfidence = (confidence: number) => {
    if (confidence === undefined || confidence === null) {
      return "N/A";
    }

    const value =
      confidence <= 1
        ? confidence * 100
        : confidence;

    return `${value.toFixed(2)}%`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#1769E0"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brand}>
              EYE<Text style={styles.brandBlue}>AI</Text>
            </Text>

            <Text style={styles.title}>Patient List</Text>

            <Text style={styles.subtitle}>
              Manage and review your patients.
            </Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.count}>
              {patients.length}
            </Text>

            <Text style={styles.countLabel}>
              Patients
            </Text>
          </View>
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#1769E0"
            />

            <Text style={styles.loadingText}>
              Loading patients...
            </Text>
          </View>
        )}

        {/* Error */}
        {!loading && error !== "" && (
          <View style={styles.errorCard}>
            <Ionicons
              name="alert-circle-outline"
              size={25}
              color="#D64545"
            />

            <View style={styles.errorContent}>
              <Text style={styles.errorTitle}>
                Unable to load patients
              </Text>

              <Text style={styles.errorText}>
                {error}
              </Text>

              <Pressable
                style={styles.retryButton}
                onPress={fetchPatients}
              >
                <Text style={styles.retryText}>
                  Try Again
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Empty State */}
        {!loading &&
          error === "" &&
          patients.length === 0 && (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="people-outline"
                  size={32}
                  color="#1769E0"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No Patients Yet
              </Text>

              <Text style={styles.emptyText}>
                Patient records created through the
                Predict page will appear here.
              </Text>
            </View>
          )}

        {/* Patient Cards */}
        {!loading &&
          error === "" &&
          patients.length > 0 && (
            <View style={styles.list}>
              {patients.map((patient) => {
                const latestPrediction =
                  getLatestPrediction(
                    patient.predictions
                  );

                const analyzed =
                  latestPrediction !== null;

                return (
                  <View
                    key={patient.id}
                    style={styles.patientCard}
                  >
                    {/* Patient Header */}
                    <View style={styles.patientHeader}>
                      <View style={styles.avatar}>
                        <Ionicons
                          name={
                            patient.gender === "Male"
                              ? "male-outline"
                              : "female-outline"
                          }
                          size={25}
                          color="#1769E0"
                        />
                      </View>

                      <View style={styles.patientInfo}>
                        <Text style={styles.patientName}>
                          {patient.fullName}
                        </Text>

                        <Text style={styles.patientDetails}>
                          {patient.age} years old •{" "}
                          {patient.gender}
                        </Text>

                        <View style={styles.statusRow}>
                          <View
                            style={[
                              styles.statusDot,
                              analyzed
                                ? styles.analyzedDot
                                : styles.pendingDot,
                            ]}
                          />

                          <Text
                            style={[
                              styles.statusText,
                              analyzed
                                ? styles.analyzedText
                                : styles.pendingText,
                            ]}
                          >
                            {analyzed
                              ? "Analyzed"
                              : "Pending"}
                          </Text>
                        </View>
                      </View>

                      {/* Delete */}
                      <Pressable
                        onPress={() =>
                          handleDelete(patient)
                        }
                        style={styles.deleteButton}
                        hitSlop={10}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={19}
                          color="#D64545"
                        />
                      </Pressable>
                    </View>

                    {/* Analysis Result */}
                    {latestPrediction && (
                      <View style={styles.analysisCard}>
                        <View style={styles.analysisHeader}>
                          <View style={styles.analysisTitleRow}>
                            <View style={styles.aiIcon}>
                              <Ionicons
                                name="sparkles-outline"
                                size={17}
                                color="#1769E0"
                              />
                            </View>

                            <Text style={styles.analysisTitle}>
                              AI Analysis
                            </Text>
                          </View>

                          <View style={styles.analysisBadge}>
                            <Text style={styles.analysisBadgeText}>
                              RESULT
                            </Text>
                          </View>
                        </View>

                        {/* Disease */}
                        <View style={styles.resultRow}>
                          <View style={styles.resultIconBox}>
                            <Ionicons
                              name="medical-outline"
                              size={19}
                              color="#1769E0"
                            />
                          </View>

                          <View style={styles.resultContent}>
                            <Text style={styles.resultLabel}>
                              Disease Result
                            </Text>

                            <Text style={styles.resultValue}>
                              {latestPrediction.diseaseResult}
                            </Text>
                          </View>
                        </View>

                        {/* Confidence */}
                        <View style={styles.resultRow}>
                          <View style={styles.resultIconBox}>
                            <Ionicons
                              name="analytics-outline"
                              size={19}
                              color="#22A06B"
                            />
                          </View>

                          <View style={styles.resultContent}>
                            <Text style={styles.resultLabel}>
                              Confidence
                            </Text>

                            <Text style={styles.confidenceValue}>
                              {formatConfidence(
                                latestPrediction.confidence
                              )}
                            </Text>
                          </View>
                        </View>

                        {/* Date */}
                        <View style={styles.resultRow}>
                          <View style={styles.resultIconBox}>
                            <Ionicons
                              name="calendar-outline"
                              size={19}
                              color="#718096"
                            />
                          </View>

                          <View style={styles.resultContent}>
                            <Text style={styles.resultLabel}>
                              Analysis Date
                            </Text>

                            <Text style={styles.resultValueSmall}>
                              {formatDate(
                                latestPrediction.createdDate
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Patient Details */}
                    {(patient.previousDiseases ||
                      patient.medications) && (
                      <View style={styles.patientDetailsCard}>
                        <Text style={styles.detailsTitle}>
                          Patient Information
                        </Text>

                        {patient.previousDiseases ? (
                          <View style={styles.detailItem}>
                            <Ionicons
                              name="document-text-outline"
                              size={17}
                              color="#718096"
                            />

                            <View style={styles.detailContent}>
                              <Text style={styles.detailLabel}>
                                Previous Diseases
                              </Text>

                              <Text style={styles.detailValue}>
                                {patient.previousDiseases}
                              </Text>
                            </View>
                          </View>
                        ) : null}

                        {patient.medications ? (
                          <View style={styles.detailItem}>
                            <Ionicons
                              name="medkit-outline"
                              size={17}
                              color="#718096"
                            />

                            <View style={styles.detailContent}>
                              <Text style={styles.detailLabel}>
                                Medications
                              </Text>

                              <Text style={styles.detailValue}>
                                {patient.medications}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

        {/* Info */}
        {!loading &&
          error === "" &&
          patients.length > 0 && (
            <View style={styles.infoCard}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#1769E0"
              />

              <Text style={styles.infoText}>
                Patient records are securely associated
                with your account.
              </Text>
            </View>
          )}
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
    paddingTop: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 28,
  },

  headerLeft: {
    flex: 1,
    paddingRight: 12,
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

  countBox: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  count: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1769E0",
  },

  countLabel: {
    fontSize: 10,
    color: "#718096",
    marginTop: 2,
    fontWeight: "600",
  },

  list: {
    gap: 14,
  },

  patientCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  patientHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  patientInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },

  patientDetails: {
    marginTop: 4,
    fontSize: 13,
    color: "#718096",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 6,
  },

  analyzedDot: {
    backgroundColor: "#22A06B",
  },

  pendingDot: {
    backgroundColor: "#E7A927",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  analyzedText: {
    color: "#22A06B",
  },

  pendingText: {
    color: "#C58A13",
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3F3",
    marginLeft: 8,
  },

  /* AI ANALYSIS */

  analysisCard: {
    marginTop: 16,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#F7FAFF",
    borderWidth: 1,
    borderColor: "#DDE9FA",
  },

  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  analysisTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  analysisTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  analysisBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "#E6F0FF",
  },

  analysisBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#1769E0",
    letterSpacing: 0.5,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  resultIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  resultContent: {
    flex: 1,
  },

  resultLabel: {
    fontSize: 11,
    color: "#8A96A8",
    fontWeight: "600",
  },

  resultValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },

  confidenceValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "800",
    color: "#22A06B",
  },

  resultValueSmall: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "600",
    color: "#53657D",
  },

  /* PATIENT INFORMATION */

  patientDetailsCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#FAFBFD",
    borderWidth: 1,
    borderColor: "#EDF0F4",
  },

  detailsTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0B1F3A",
    marginBottom: 10,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },

  detailContent: {
    flex: 1,
    marginLeft: 9,
  },

  detailLabel: {
    fontSize: 10,
    color: "#8A96A8",
    fontWeight: "600",
  },

  detailValue: {
    marginTop: 2,
    fontSize: 12,
    color: "#53657D",
    lineHeight: 18,
  },

  /* LOADING */

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#718096",
  },

  /* ERROR */

  errorCard: {
    backgroundColor: "#FFF5F5",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F3D2D2",
  },

  errorContent: {
    flex: 1,
    marginLeft: 12,
  },

  errorTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B83232",
  },

  errorText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: "#7A4A4A",
  },

  retryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#1769E0",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 10,
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  /* EMPTY */

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0B1F3A",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#718096",
  },

  /* INFO */

  infoCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#EEF4FF",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 19,
    color: "#53657D",
  },
});

