//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth, firestore } from "../../firebase";

const BusinessOwnerDashboardScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);

  const navigation = useNavigation();

  // Fetch user profile and business data
  useEffect(() => {
    const userId = auth.currentUser.uid;
    const userDocRef = firestore.collection("users").doc(userId);
    const businessDocRef = firestore.collection("businesses").doc(userId);

    userDocRef.get().then((doc) => {
      if (doc.exists) {
        setUserProfile(doc.data());
      }
    });

    businessDocRef.get().then((doc) => {
      if (doc.exists) {
        setBusinessData(doc.data());
      }
    });
  }, []);

  const updateProfile = async () => {
    // Implement the logic to update the user's profile

    const userId = auth.currentUser.uid;
    const userDocRef = firestore.collection("users").doc(userId);

    try {
      await userDocRef.update(userProfile);
      setIsEditingProfile(false);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();

      navigation.navigate("LoginScreen"); // Navigate to your login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const updateBusiness = async () => {
    // Implement the logic to update the business data

    const userId = auth.currentUser.uid;
    const businessDocRef = firestore.collection("businesses").doc(userId);

    try {
      await businessDocRef.update(businessData);
      setIsEditingBusiness(false);
      console.log("Business data updated successfully");
    } catch (error) {
      console.error("Error updating business data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Business Owner Dashboard</Text>

      <View style={styles.profileCard}>
        <Text style={styles.cardHeading}>Profile Information</Text>
        {isEditingProfile ? (
          <View>
            <TextInput
              placeholder="First Name"
              value={userProfile.firstName}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, firstName: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={userProfile.lastName}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, lastName: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={userProfile.email}
              onChangeText={(text) =>
                setUserProfile({ ...userProfile, email: text })
              }
              style={styles.input}
            />

            {/* Add more profile fields as needed */}
          </View>
        ) : (
          <View>
            <Text>First Name: {userProfile.firstName}</Text>
            <Text>Last Name: {userProfile.lastName}</Text>
            <Text>Email: {userProfile.email}</Text>
            {/* Display other profile fields */}
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            isEditingProfile ? updateProfile() : setIsEditingProfile(true)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isEditingProfile ? "Save Profile" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.businessCard}>
        <Text style={styles.cardHeading}>Business Information</Text>
        {isEditingBusiness ? (
          <View>
            <TextInput
              placeholder="Business Name"
              value={businessData.name}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, name: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Business Address"
              value={businessData.address}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, address: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Contact Email"
              value={businessData.contactEmail}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, contactEmail: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Contact Phone"
              value={businessData.contactPhone}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, contactPhone: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Business Type"
              value={businessData.type}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, type: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Business Description"
              value={businessData.description}
              onChangeText={(text) =>
                setBusinessData({ ...businessData, description: text })
              }
              style={styles.input}
            />
            {/* Add more business fields as needed */}
          </View>
        ) : (
          <View>
            <Text>Business Name: {businessData.name}</Text>
            <Text>Business Address: {businessData.address}</Text>
            <Text>Business Email: {businessData.contactEmail}</Text>
            <Text>Business Phone: {businessData.contactPhone}</Text>
            <Text>Business Type: {businessData.type}</Text>
            <Text>Business Description: {businessData.description}</Text>
            {/* Display other business fields */}
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            isEditingBusiness ? updateBusiness() : setIsEditingBusiness(true)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isEditingBusiness ? "Save Business Info" : "Edit Business Info"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#0782F9", // Red color for the logout button
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50, // Adjust the margin as needed
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    fontStyle: "italic",
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  businessCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },

  input: {
    backgroundColor: "grey",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default BusinessOwnerDashboardScreen;
