import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { Stack } from 'expo-router';
import ComplaintCard from "./components/ComplaintCard";
import HeaderSlider from "./components/HeaderSlider";
import { I18nManager } from "react-native";
import BottomNavigation from "./components/BottomNav";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/images/logo.png")}
    />
  );
}

export default function Home() {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              title: "My home",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <ScrollView style={{ flex: 1 }}>
            <HeaderSlider />
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            marginTop: 15,
            backgroundColor: "#0c84e0",
            width: "50%",
            marginHorizontal: "auto",
            padding: 5,
            borderRadius: 10,
            color: "white",
          }}
        >
          شکایات
        </Text>
        <ComplaintCard />
        <ComplaintCard />
        <ComplaintCard />
        <ComplaintCard />
        </ScrollView>
        <BottomNavigation />
      </View>
    </GestureHandlerRootView>
  );
}