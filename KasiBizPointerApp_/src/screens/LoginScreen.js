//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(""); // Store user role
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Get the user's role from Firestore
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserRole(doc.data().role);
            }
          })
          .catch((error) => {
            console.error("Error getting user role:", error);
          });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setIsSubmitting(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        // Check user role and navigate accordingly
        if (userRole === "business owner") {
          // Check if the business owner has registered a business
          const userId = auth.currentUser.uid;
          firestore
            .collection("businesses")
            .doc(userId)
            .get()
            .then((businessDoc) => {
              setIsSubmitting(false);
              if (businessDoc.exists) {
                // Business owner has registered a business, navigate to the dashboard
                navigation.navigate("BusinessOwnerDashboardScreen");
              } else {
                setIsSubmitting(false);
                // Business owner hasn't registered a business, navigate to the registration screen
                navigation.navigate("BusinessRegistrationScreen");
              }
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.error("Error checking business registration:", error);
            });
        } else {
          setIsSubmitting(false);
          navigation.navigate("HomeScreen"); // Navigate to the appropriate screen for other users
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("../../assets/images/logo1.png")}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.button}
          disabled={!(!!email && !!password)}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  logo: {
    width: 300,
    height: 250,
    marginBottom: 0,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 16,
    height: 45,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  registerText: {
    color: "black",
    fontWeight: "500",
    fontSize: 12,
  },
});
