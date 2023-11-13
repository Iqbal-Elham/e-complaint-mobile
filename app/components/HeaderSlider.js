import React from "react";
import { Dimensions, Text, View, Image, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";

const HeaderSlider = () => {

  const images = [
    { id: 1, source: require("../../assets/images/slider1.jpeg") },
    { id: 2, source: require("../../assets/images/slider2.jpeg") },
    { id: 3, source: require("../../assets/images/slider3.jpeg") },
  ];

  const width = Dimensions.get("window").width;

  return (
    <ScrollView>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={item.source}
            />
            {/* <Text style={{ textAlign: "center", fontSize: 30 }}>{item.id}</Text> */}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default HeaderSlider;
