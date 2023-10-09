import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Button, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCcSWznWKu6p2NwKlrbcfRCHwUvzGa3uwU");

export default function MapBox() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.55595,
    longitude: 22.9375,
    latitudeDelta: 12.6,
    longitudeDelta: 375.5,
  });

  const [customAddress, setCustomAddress] = useState("");
  const navigation = useNavigation();

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      console.log(location.coords.latitude, location.coords.longitude);

      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const setLocationByAddress = async () => {
    try {
      const response = await Geocoder.from(customAddress);

      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;

        setMapRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        console.log("Location by address:", lat, lng);
      } else {
        console.error("No results found for the address");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <Button title="Confirm Location" onPress={userLocation} />
      <TextInput
        placeholder="Enter custom address"
        value={customAddress}
        onChangeText={(text) => setCustomAddress(text)}
        style={styles.input}
      />
      <Button title="Set Location by Address" onPress={setLocationByAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  input: {
    width: Dimensions.get("window").width - 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
});
