import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IlLogo } from "../../assets/Illustration";
import { getData } from "../../utils";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      getData("token").then((res) => {
        if (res) {
          navigation.reset({ index: 0, routes: [{ name: "MainApp" }] });
        } else {
          navigation.replace("SignIn");
        }
      });
    }, 2000);
  });
  return (
    <View
      style={{
        backgroundColor: "#FFC700",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IlLogo />
      <View style={{ height: 38 }}></View>
      <Text
        style={{ fontSize: 32, color: "#020202", fontFamily: "Poppins-Medium" }}
      >
        FoodMarket
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
