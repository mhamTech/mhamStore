import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
// import SearchInput from "./SearchInput";
import Animated from "react-native-reanimated";
// import ShareItem from "../../../components/UI/ShareItem";
//Color
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

const { interpolate, Extrapolate } = Animated;
const HEADER_HEIGHT = 80;
const HEADER_MIN = 40;
const HEADER_DISTANCE = HEADER_HEIGHT - HEADER_MIN;

// export const Header = ({ navigation, searchFilterFunction, scrollY, CategoryName }) => {
export const Header = (props) => {

  // const headerHeight = interpolate(props.scrollY, {
  //   inputRange: [0, HEADER_DISTANCE],
  //   outputRange: [0, -HEADER_MIN / 2],
  //   extrapolate: Extrapolate.CLAMP,
  // });
  // const titleOpacity = interpolate(props.scrollY, {
  //   inputRange: [0, HEADER_DISTANCE],
  //   outputRange: [1, 0],
  //   extrapolate: Extrapolate.CLAMP,
  // });
  // const inputTranslate = interpolate(props.scrollY, {
  //   inputRange: [0, HEADER_DISTANCE],
  //   outputRange: [0, -HEADER_MIN + 10],
  //   extrapolate: Extrapolate.CLAMP,
  // });
  // const inputWidth = interpolate(props.scrollY, {
  //   inputRange: [0, HEADER_DISTANCE],
  //   outputRange: [width - 20, width - 80],
  //   extrapolate: Extrapolate.CLAMP,
  // });
  return (
    <>
        <View style={{ width: '100%', left: 0, top: Platform.OS === "android" ? 0 : 5, zIndex: 10 }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack() }
            style={styles.icon}
          >
            <Ionicons name="ios-arrow-back" size={25} color={Colors.water.blue} />
          </TouchableOpacity>
        </View>
      <Animated.View
        style={[
            // transform: [{ translateY: headerHeight }]}]}>
          styles.header, { flexDirection: 'column', justifyContent: 'center',}]}>
        <Animated.View
          style={{
            // opacity: titleOpacity,
            height: 50,
          }}>
          <CustomText style={{...styles.title}}>{props.CategoryName}</CustomText>
        </Animated.View>
      </Animated.View>
    </>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  // topBar: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   // paddingHorizontal: 20,
  //   alignItems: "center",
  //   height: HEADER_MIN,
  //   zIndex: 100,
  //   marginTop: 25,
  //   borderWidth: 1,

  // },
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    height: HEADER_HEIGHT,
    backgroundColor: "#ffffff",
    marginTop: 25,
    
  },
  title: {
    marginTop: Platform.OS === "android" ? 0 : 10,
    fontSize: 30,
    color: Colors.water.blue,
  },
  // shareItem: {
  //   position: "absolute",
  //   right: 0,
  //   top: 40,
  //   width: 40,
  //   height: 40,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  icon: {
    width: 40,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginStart: 8,

    // borderWidth: 1,
    // borderRadius: 50,
    // backgroundColor: '#bbb'
  },
  breaker: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    backgroundColor: 'black',
  },
});
