import React, { useState } from "react";
import { Link, Stack } from "expo-router";
// import { Image } from "@bacons/react-views";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
// import ImageSlider from "react-native-image-slider";
// import Video from "react-native-video";

const ComplaintCard = () => {
  return (
    <Card title="HELLO WORLD" image={require("../../assets/images/Bribe.jpg")}>
      <Image
        style={{
          width: "100%",
          height: 250,
          marginHorizontal: "auto",
          display: "flex",
        }}
        source={require("../../assets/images/Bribe.jpg")}
      />
      <Text style={{ marginTop: 20, fontSize: 24, fontWeight: "bold" }}>
        شکایت اول
      </Text>
      <Text style={{ marginVertical: 20 }}>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
        درصد گذشته،
      </Text>
      <Link
        href={{ pathname: "details", params: { name: "شکایت اول" } }}
        style={{
          textAlign: "center",
          fontSize: 18,
          backgroundColor: "#0c84e0",
          padding: 10,
          borderRadius: 10,
          color: "white",
        }}
      >
        مشاهده بیشتر
      </Link>
    </Card>
  );
};

export default ComplaintCard;
