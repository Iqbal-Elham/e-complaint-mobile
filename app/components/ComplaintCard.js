import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

const ComplaintCard = () => {
  return (
    <Card 
    title="HELLO WORLD" 
    image={require("../../assets/images/Bribe.jpg")} 
    containerStyle={{
      borderRadius: 7,
      shadowColor: '#171717',
      shadowOffset: {width: -10, height: 10},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      padding: 20,
      marginBottom: 15,
    }}
    >
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
      <Text style={{ marginVertical: 20, lineHeight: 25 }}>
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
