import React from "react";
import { View, StyleSheet } from "react-native";
//Text
import { TextIcon } from "./TextIcon";
import { Location } from "./Location";
import { Phone } from "./Phone";
import { Hours } from "./Hours";

export const ContactBody = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.info}>
        <Location />
        <Phone />
        <Hours />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    backgroundColor: "#eee",
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    paddingHorizontal: 45,
    // paddingVertical: 15,
    marginTop: -20,
  },
  info: {
    marginTop: 20,
  },
});
