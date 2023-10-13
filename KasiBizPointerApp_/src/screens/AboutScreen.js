//@ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack("HomeScreen"); // Navigate back to the previous screen (home page)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph1}>
        Welcome to KasiBizPointer - Explore Kasi! Support Kasi!
      </Text>
      <Text style={styles.paragraph}>
        At KasiBizPointer, we are passionate about connecting communities with
        the vibrant and diverse businesses that make up the heartbeat of our
        townships, or "kasis" as we lovingly call them. Our mission is to
        empower both residents and entrepreneurs by providing a user-friendly
        platform that fosters economic growth and community development.
      </Text>
      <Text style={styles.paragraph1}>Our Story</Text>
      <Text style={styles.paragraph}>
        KasiBizPointer is born out of a shared vision to support and uplift our
        local communities. We realized that many incredible businesses within
        our townships were hidden gems, known only to a select few. We believed
        that these businesses deserved a spotlight, and residents deserved
        convenient access to the goods and services they offered.
      </Text>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 60,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
  },

  paragraph1: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold", // Add some spacing between paragraphs
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goBackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AboutScreen;
