//@ts-nocheck
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { AppRegistry } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import BusinessRegistrationScreen from "./src/screens/RegisterBusinessScreen";
import BusinessOwnerDashboardScreen from "./src/screens/BusinessOwnerDashboardScreen";
import MapBox from "./src/screens/MapView";
import AboutScreen from "./src/screens/AboutScreen";
import BusinessDetail from "./src/screens/BusinessDetail";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LandingScreen"
          component={LandingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MapView"
          component={MapBox}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BusinessDetail"
          component={BusinessDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BusinessRegistrationScreen"
          component={BusinessRegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BusinessOwnerDashboardScreen"
          component={BusinessOwnerDashboardScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AboutScreen"
          component={AboutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent("KasiBizPointer", () => App);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
