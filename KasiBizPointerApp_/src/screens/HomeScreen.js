//@ts-nocheck
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { firestore } from "../../firebase";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleImagePress = (description) => {
    navigation.navigate("BusinessDetail", {
      description,
    });
  };

  const handleSearch = (query) => {
    // Filter businesses based on the search query
    const filtered = featuredBusinesses.filter((business) =>
      business.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  console.log("HomeScreen rendered");
  // Sample data for featured locations
  const featuredBusinesses = [
    {
      id: "1",
      name: "Restuarants",
      image: require("../../assets/images/CoffeeShop.jpg"),
      description: "Delicious local cuisine",
    },
    {
      id: "2",
      name: "Salons",
      image: require("../../assets/images/salon.jpg"),
      description: "Unique local products",
    },
    {
      id: "3",
      name: "Lifestyle & Entertainment",
      image: require("../../assets/images/LifeStyle.jpg"),
      description: "Unique local products",
    },
    {
      id: "4",
      name: "Car Wash",
      image: require("../../assets/images/carwash.jpg"),
      description: "Unique local products",
    },
    {
      id: "5",
      name: "Tailor",
      image: require("../../assets/images/tailor.jpg"),
      description: "Unique local products",
    },
    // Add more featured locations here
  ];

  const featuredPopulars = [
    {
      id: "9",
      name: "The Hangawt",
      image: require("../../assets/images/TheHangout.png"),
      description: "Unique local products",
    },
    {
      id: "10",
      name: "Alicia Skin Solution",
      image: require("../../assets/images/alicia.png"),
      description: "Unique local products",
    },
    {
      id: "11",
      name: "Konka",
      image: require("../../assets/images/KONKA.jpg"),
      description: "Unique local products",
    },
    {
      id: "12",
      name: "AmaKipkip",
      image: require("../../assets/images/amakip.png"),
      description: "Unique local products",
    },
    // Add more featured locations here
  ];
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const businessData = [];
      const snapshot = await firestore.collection("businesses").get();
      snapshot.forEach((doc) => {
        businessData.push(doc.data());
      });

      setBusinesses(businessData);
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* App logo */}
        <Image
          source={require("../../assets/images/logo1.png")}
          style={styles.logo}
        />

        {/* Search bar */}
        <TextInput placeholder="Search business" style={styles.searchInput} />

        {/* Hamburger menu icon */}
        {/* You can add an icon here to open the navigation drawer */}
      </View>

      <View style={styles.content}>
        {/* Featured Locations */}
        <Text style={styles.sectionTitle}>Featured Businesses</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {featuredBusinesses.map((item) => (
            <TouchableOpacity style={styles.featuredItem} key={item.id}>
              <Image source={item.image} style={styles.featuredItemImage} />
              <Text style={styles.featuredItemName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle1}>Popular</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {featuredPopulars.map((item) => (
            <TouchableOpacity style={styles.featuredItem} key={item.id}>
              <Image source={item.image} style={styles.featuredItemImage} />
              <Text style={styles.featuredItemName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {businesses.map((item, i) => {
            return (
              <TouchableOpacity
                style={styles.featuredItem}
                key={item.ownerId}
                onPress={() => handleImagePress(item)}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.featuredItemImage}
                />
                <Text style={styles.featuredItemName}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Categories */}
        {/* Display category icons here with onPress handlers to navigate to category-specific pages */}

        {/* Map Preview */}

        {/* News and Events */}
        {/* Display news updates or upcoming events */}

        {/* Search Results */}
        {/* Display search results here if a search is performed */}
      </View>

      <View style={styles.bottomNavigation}>
        {/* Search Icon */}
        <TouchableOpacity>
          <Icon name="home" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user" size={30} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AboutScreen")}>
          <Icon name="info" size={30} color="#333" />
        </TouchableOpacity>

        {/* Logout Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Icon name="sign-out" size={30} color="#333" />
        </TouchableOpacity>

        {/* Include icons and labels for Home, Map, Favorites, and Profile */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  featuredList: {
    flexDirection: "row",
    marginTop: 16,
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 16,
    marginTop: 30,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 6,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 0,
  },
  featuredItem: {
    marginRight: 16,
  },
  featuredItemImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  featuredItemName: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  descriptionContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
  },
});
