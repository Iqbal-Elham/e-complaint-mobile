import React, { useState } from "react";
// import { Image } from "@bacons/react-views";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
// import ImageSlider from "react-native-image-slider";
// import Video from "react-native-video";

const ComplaintCard = () => {
  return (
    <Card title="HELLO WORLD" image={require("../../assets/images/Bribe.jpg")}>
      <Image style={{ width: 250, height: 250, margin: 'auto' }} source={require("../../assets/images/Bribe.jpg")} />
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  );
};

export default ComplaintCard;
