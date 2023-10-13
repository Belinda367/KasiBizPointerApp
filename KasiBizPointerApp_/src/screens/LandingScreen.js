//@ts-nocheck
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../firebase";

export default function LandingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const currentUserSession = auth.currentUser;
    if (currentUserSession) {
      firestore
        .collection("businesses")
        .doc(currentUserSession.uid)
        .get()
        .then((businessDoc) => {
          if (businessDoc.exists) {
            navigation.navigate("BusinessOwnerDashboardScreen");
          } else {
            navigation.navigate("HomeScreen");
          }
        })
        .catch((error) => {
          navigation.navigate("LoginScreen");
        });
    }
  }, []);
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo1.png")}
        style={styles.logo}
      />
      {/* background image */}
      <Image
        source={require("../../assets/images/welcome.png")}
        style={styles.backgroundImage}
      />
      {/* content & gradient */}
      <View style={styles.content}>
        <LinearGradient
          colors={["transparent", "rgba(3,105,161,0.8)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Kasi BizPointer</Text>
          <Text style={styles.subtitle}>Support iKasi</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 220,
    height: 200,
    marginTop: 100,
    marginLeft: 0,
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 100,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  gradient: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
    bottom: 0,
  },
  textContainer: {
    marginTop: hp(20),
    alignItems: "center",
  },
  title: {
    fontSize: wp(10),
    fontWeight: "bold",
    color: "white",
    marginBottom: hp(2),
    padding: 2,
  },
  subtitle: {
    fontSize: wp(4),
    color: "white",
    marginBottom: hp(4),
  },
  button: {
    backgroundColor: "#098BF5",
    paddingVertical: hp(1),
    paddingHorizontal: wp(10),
    borderRadius: wp(10),
    marginBottom: 90,
  },
  buttonText: {
    fontSize: wp(5.0),
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
