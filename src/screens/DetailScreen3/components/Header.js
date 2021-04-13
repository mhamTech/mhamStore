import React, { useState } from "react";
import {
  View,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Animatable
import * as Animatable from "react-native-animatable";
//Color
import Colors from "../../../utils/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";
import CustomText from "../../../components/UI/CustomText";

const { height } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT =
  Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header = ({ navigation, scrollY, item }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
  return (
    <Animatable.View delay={500} animation="fadeInDown">
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={25} color={Colors.water.blue} />
        </TouchableOpacity>
        <Animated.View style={{ marginHorizontal: 25, opacity: headerOpacity, marginBottom: 20, marginTop: 35 }}>
          <CustomText style={{ fontSize: 20, color: Colors.water.white, fontWeight: "500" }}>{item.filename}</CustomText>
        </Animated.View>
        <View/>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.water.blue,
          overflow: "hidden",
          opacity: headerOpacity,
          height: 400,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ translateY: headerTranslate }],
        }}/>
      <Animated.Image
        source={{ uri: item.url }}
        style={[styles.image,{opacity: imageOpacity, transform: [{ translateY: headerTranslate }]}]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <ActivityIndicator size="small" color={'grey'} />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  sss: {
    backgroundColor: '#fff',
    top: 5, width: '100%',
    height: '40%',
    marginBottom: 10,
    borderRadius: 20,
    paddingTop: Platform.OS === "android" ? 15 : 25
  },
  container: {
    height: '100%',
    width: '100%',
  },
  topBar: {
    // paddingTop: 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    // height: HEADER_MIN_HEIGHT,
    zIndex: 1000,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  image: {
    position: "absolute",
    top: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "contain",
  },
});
