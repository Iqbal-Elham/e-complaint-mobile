import { Link, Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import ComplaintCard from "./components/ComplaintCard";
import HeaderSlider from "./components/HeaderSlider";
import { I18nManager } from "react-native";

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
    <View>
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
    </View>
  );
}
