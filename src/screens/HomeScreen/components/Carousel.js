import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import banners from "../../../db/Banners";
import Slide from "./Slide";
import Pagination from "./Pagination";

import { SliderBox } from "react-native-image-slider-box";
import Colors from "../../../utils/Colors";

const { width } = Dimensions.get('window');

export const Carousel = () => {
  
  const banners = [
    "https://picsum.photos/392/200",
    "https://picsum.photos/392/200",
    "https://picsum.photos/392/200",
    "https://picsum.photos/392/200",
    "https://picsum.photos/392/200",
    // '','','',
  ];

  return (
    <View style={styles.container}>
      <SliderBox
        images={banners}
        autoplay={true}
        circleLoop={true}
        inactiveDotColor={Colors.water.white}
        dotColor={Colors.water.blue}
        imageLoadingColor={'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    // borderWidth: 2,
    // borderColor: 'red'
  },
});
