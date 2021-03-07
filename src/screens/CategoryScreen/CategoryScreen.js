import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
//redux
import { useSelector } from "react-redux";
//Color
import Colors from "../../utils/Colors";
//Component
import { CategoryBody } from "./components";

export const CategoryScreen = (props) => {
  return (
    <View style={styles.container}>
      <CategoryBody
        navigation={props.navigation}
        CategoryName={props.route.params.categoryName}
        DATA={props.route.params.DATA}
        image={props.route.params.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: null,
    // marginVertical: 40,
  },
});
