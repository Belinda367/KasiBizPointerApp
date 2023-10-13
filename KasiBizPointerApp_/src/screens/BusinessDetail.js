//@ts-nocheck
import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BusinessDetail = () => {
  const navigation = useNavigation();
  const businessDetails = navigation
    .getState()
    .routes.find((item) => item.name == "BusinessDetail").params;

  const handleGoBack = () => {
    navigation.goBack("HomeScreen"); // Navigate back to the previous screen (home page)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Business Name:</Text>
      <Text style={styles.description}>
        {businessDetails?.description?.name}
      </Text>
      <Text style={styles.description}>Address:</Text>
      <Text style={styles.description}>
        {businessDetails?.description?.address}
      </Text>
      <Text style={styles.description}>Contact details</Text>
      <Text style={styles.description}>
        {businessDetails?.description?.contacts}
      </Text>

      <Text style={styles.description}>Description</Text>
      <Text style={styles.description}>
        {businessDetails?.description?.description}
      </Text>
      <Button onPress={() => handleGoBack()} title="Go Back"></Button>
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

export default BusinessDetail;
