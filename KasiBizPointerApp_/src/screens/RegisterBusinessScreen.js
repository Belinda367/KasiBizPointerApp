//@ts-nocheck
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth, firestore } from "../../firebase";

const BusinessRegistrationScreen = () => {
  // Define state variables to store business information
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  // Access the navigation object
  const navigation = useNavigation();

  // Function to handle business registration
  const registerBusiness = async () => {
    try {
      // Get the current user's ID
      const userId = auth.currentUser.uid;

      // Create a new document in the "businesses" collection with the business information
      await firestore.collection("businesses").doc(userId).set({
        name: businessName,
        address: businessAddress,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        type: businessType,
        description: businessDescription,
        ownerId: userId,
      });

      console.log("Business registered successfully");
      navigation.navigate("BusinessOwnerDashboardScreen");
    } catch (error) {
      console.error(error.message);
      alert("Business registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/images/logo1.png")}
        style={styles.logo}
      />
      <Text style={{ fontWeight: "bold" }}>Register Your Business Here</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Business Name"
          onChangeText={(text) => setBusinessName(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Business Address"
          onChangeText={(text) => setBusinessAddress(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Contact Email"
          onChangeText={(text) => setContactEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Contact Phone"
          onChangeText={(text) => setContactPhone(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Business Type"
          onChangeText={(text) => setBusinessType(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Business Description"
          onChangeText={(text) => setBusinessDescription(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          multiline={true} // Allow multiple lines of text
          numberOfLines={4} // Set the number of visible lines
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={registerBusiness} style={styles.button}>
          <Text style={styles.buttonText}>Register Business</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BusinessRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});
