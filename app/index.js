import React, { useEffect, useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import ComplaintCard from "./components/ComplaintCard";
import HeaderSlider from "./components/HeaderSlider";
import { I18nManager } from "react-native";
import BottomNavigation from "./components/BottomNav";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../i18n";
import { useTranslation } from "react-i18next";
import { fetchComplaints } from "./api";
import Pagination from "./components/Pagination";

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

  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const itemsPerPage = 6;

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    fetchComplaints(itemsPerPage, currentPage)
      .then((response) => {
        setComplaints(response?.results);
        setHasPrev(response?.previous);
        setHasNext(response?.next);
        setTotalPages(Math.ceil(response?.count / itemsPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const handleComplaintViewUpdate = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id
        ? { ...complaint, views: complaint.views + 1 }
        : complaint
    );
    setComplaints(updatedComplaints);
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

            headerTitle: () => (
              <View
                style={{
                  marginLeft: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <Text style={{ color: "#fff" }}>
                  <Text onPress={() => changeLanguage("ps")}>پشتو</Text> |{" "}
                  <Text onPress={() => changeLanguage("fa")}>فارسی</Text>
                </Text>
                <TouchableOpacity
                  style={{ color: "#fff" }}
                  onPress={() =>
                    navigation.navigate("AboutUs", { name: "در باره ما" })
                  }
                >
                  درباره ما
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Text style={{ color: "white", marginHorizontal: 5 }}>
                    {t("ministry_brand")}
                  </Text>
                  <Text style={{ color: "white", marginHorizontal: 5 }}>
                    {t("save_complaint")}
                  </Text>
                </View>
                <LogoTitle />
              </View>
            ),
          }}
        />
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
          <HeaderSlider />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              padding: 8,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 28,
                backgroundColor: "#4cc3e0",
                width: "100%",
                padding: 5,
                color: "white",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopWidth: 1,
              }}
            >
              {t("complaints")}
            </Text>
          </View>

          {complaints?.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              updateComplaintViews={handleComplaintViewUpdate}
            />
          ))}
          {totalPages > 1 && (
            <View style={{ marginBottom: 50 }}>
              <Pagination
                hasPrev={hasPrev}
                hasNext={hasNext}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </View>
          )}
        </ScrollView>
        <BottomNavigation />
      </View>
    </GestureHandlerRootView>
  );
}
