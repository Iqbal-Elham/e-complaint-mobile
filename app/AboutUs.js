import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const AboutUs = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen
        options={{
          title: params.name,
          headerTitleAlign: "center",
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/images/Bribe.jpg")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.paragraph}>
            Welcome to our page! We are a team dedicated to providing the best
            services. Our passion for excellence drives us to continuously
            innovate and improve our products. Thank you for visiting us!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});

export default AboutUs;
