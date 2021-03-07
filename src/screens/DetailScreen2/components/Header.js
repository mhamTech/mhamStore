import React, { useState } from "react";
import {
  View,
  Animated,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Animatable
import * as Animatable from "react-native-animatable";
import ShareItem from "../../../components/UI/ShareItem";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
import { Video } from 'expo-av';

const { height, width } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT =
  Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header = ({ navigation, scrollY, item }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // const _handleVideoRef = component => {
  //   const playbackObject = component;
  //   console.log('playbackObject', playbackObject)
  // }
  
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
    <Animatable.View delay={500} animation="fadeInDown" style={{  }}>
      <View style={{...styles.topBar }}>
        <View style={{ position: "absolute", left: 0, top: 10, zIndex: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{...styles.goBackIcon}}
          >
            <Ionicons name="ios-arrow-back" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ position: "absolute", left: 0, top: Platform.OS === "android" ? 0 : 5, zIndex: 10 }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.icon}
          >
            <Ionicons name="ios-arrow-back" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View> */}
        <Animated.View style={{ opacity: headerOpacity }}>
          <CustomText
            style={{ fontSize: 26, color: Colors.light_grey, fontWeight: "500" }}>
            {item.filename}
          </CustomText>
        </Animated.View>
        <View style={{...styles.shareIcon}}>
          <ShareItem
            imageURL={item.url}
            title={item.filename}
            message={item.filename}
          />
        </View>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.lighter_gold,
          overflow: "hidden",
          opacity: headerOpacity,
          height: HEADER_MAX_HEIGHT,
          transform: [{ translateY: headerTranslate }],
        }}/>
      <Animated.Image
        source={{ uri: item.url }}
        style={[
          styles.image,
          {
            opacity: imageOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <ActivityIndicator size="large" color={Colors.dark} />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    // paddingTop: Platform.OS === "android" ? 60 : 25,
    marginTop: 15,
    width: width / 1.01,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    //paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_MIN_HEIGHT,
    zIndex: 1000,
  },
  goBackIcon: {
    // borderWidth: 1,
    width: 40,
    height: 40,
    width: width / 2,
    marginEnd: 5,
    alignItems: "flex-start",
  },
  shareIcon: {
    // borderWidth: 1,
    width: 40,
    height: 40,
    width: width / 2,
    marginEnd: 5,
    alignItems: "flex-end",
  },
  image: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 25 : 15,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: "contain",
  },
});
