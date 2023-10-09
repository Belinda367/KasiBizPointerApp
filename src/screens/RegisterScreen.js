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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const navigation = useNavigation();
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const roles = [
    // Define the available roles
    {
      label: "User",
      value: "user",
    },
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Business Owner",
      value: "business owner",
    },
  ];

  const registerUser = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Get the user's ID
      const userId = userCredential.user.uid;

      // Save user data including the role to Firestore
      await firestore.collection("users").doc(userId).set({
        firstName,
        lastName,
        email,
        role: selectedRole,
      });

      console.log("User registered successfully");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error(error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/images/logo1.png")}
        style={styles.logo}
      />
      <Text style={{ fontWeight: "bold" }}>Register as:</Text>
      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedRole === "user" && styles.selectedRadioButton,
        ]}
        onPress={() => handleRoleSelection("user")}
      >
        <Text>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedRole === "admin" && styles.selectedRadioButton,
        ]}
        onPress={() => handleRoleSelection("admin")}
      >
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedRole === "business owner" && styles.selectedRadioButton,
        ]}
        onPress={() => handleRoleSelection("business owner")}
      >
        <Text>Business</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.buttonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    fontSize: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
    margin: 5,
  },
  selectedRadioButton: {
    backgroundColor: "#0782F9",
  },
});
