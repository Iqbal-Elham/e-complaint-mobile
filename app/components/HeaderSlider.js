import React from "react";
import { Dimensions, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const HeaderSlider = () => {
  const images = [
    { id: 1, source: require("../../assets/images/slider1.jpeg") },
    { id: 2, source: require("../../assets/images/slider2.jpeg") },
    { id: 3, source: require("../../assets/images/slider3.jpeg") },
  ];

  const width = Dimensions.get("window").width;

  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      autoPlayInterval={3000}
      data={images}
      renderItem={({ item }) => (
        <View
          key={item.id}
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
        </View>
      )}
    />
  );
};

export default HeaderSlider;
