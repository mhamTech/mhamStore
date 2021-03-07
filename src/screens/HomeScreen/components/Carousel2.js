import React, { useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import banners from "../../../db/Banners";
import Slide from "./Slide";
import Pagination from "./Pagination";
const { width } = Dimensions.get('window');
import carousel from 'react-native-snap-carousel';


export class Carousel2 extends React.Component {
  render(){
    const scrollX = useRef(new Animated.Value(0.01)).current;
    return (
      <>
        
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginHorizontal: 1.5,
  },
});
