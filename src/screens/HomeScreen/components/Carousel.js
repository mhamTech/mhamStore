import React from "react";
import { View } from "react-native";
// import banners from "../../../db/Banners";
// import Slide from "./Slide";
// import Pagination from "./Pagination";

import { SliderBox } from "react-native-image-slider-box";
import Colors from "../../../utils/Colors";

export const Carousel = ({ products, top, bottom }) => {
  // console.log(`products`, products)

  var images = [];
  products.map(item => {
    images.push(item.url)
    item.images.map(image => {
      images.push(image)
    })
  });

  // console.log(`images`, images)
  return (
    <View style={{marginTop: top, marginBottom: bottom }}>
      <SliderBox
        images={images.slice(0, 8)}
        autoplay={true}
        circleLoop={true}
        inactiveDotColor={Colors.water.white}
        dotColor={Colors.water.blue}
        imageLoadingColor={'black'}
      />
    </View>
  );
};
