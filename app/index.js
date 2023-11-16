import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import ComplaintCard from "./components/ComplaintCard";
import HeaderSlider from "./components/HeaderSlider";
import { I18nManager } from "react-native";
import BottomNavigation from "./components/BottomNav";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import '../i18n'; 
import { useTranslation } from 'react-i18next';

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

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

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
            headerTitle: () => <Text />,
            headerRight: () => (
              <View style={{ marginRight: 25, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: 'white', marginHorizontal: 5 }}>{t('ministry_brand')}</Text>
                <Text style={{ color: 'white', marginHorizontal: 5 }}>{t('save_complaint')}</Text>
                </View>
                <LogoTitle />
              </View>
            ),
            headerLeft: () => (
              <View style={{ marginLeft: 25 }}>
                <Text style={{ color: "#fff" }}><Text onPress={() => changeLanguage('ps')}>پشتو</Text> | <Text onPress={() => changeLanguage('fa')}>فارسی</Text></Text>
              </View>
            ),
          }}
        />
        <ScrollView style={{ flex: 1, paddingBottom: 70 }}>
          <HeaderSlider />
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              marginTop: 15,
              backgroundColor: "#0a7ddcbb",
              width: "50%",
              marginHorizontal: "auto",
              padding: 5,
              borderRadius: 10,
              color: "white",
              borderBottomWidth: 2,
            }}
          >
            {t('complaints')}
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
