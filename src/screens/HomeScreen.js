import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
       <View style={styles.navbar}>
        <Text style={styles.logo}>Your Logo</Text>
        <View style={styles.categories}>
          <Text style={styles.category}>Category 1</Text>
          <Text style={styles.category}>Category 2</Text>
          <Text style={styles.category}>Category 3</Text>
          <Text style={styles.category}>Category 4</Text>
        </View>
      </View>

      {/* Business Pictures */}
      <ScrollView horizontal style={styles.businessPictures}>
        {/* Animated business pictures go here */}
        <Image source={require("../../assets/images/welcome.png")} style={styles.businessImage} />
        <Image source={require("../../assets/images/welcome.png")} style={styles.businessImage} />
        <Image source={require("../../assets/images/welcome.png")} style={styles.businessImage} />
      </ScrollView>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#777"
        />
        {/* You can add a search button here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
  },
  category: {
    color: '#fff',
    marginRight: 20,
  },
  businessPictures: {
    flexDirection: 'row',
    padding: 10,
  },
  businessImage: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  searchContainer: {
    padding: 20,
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default HomeScreen;
