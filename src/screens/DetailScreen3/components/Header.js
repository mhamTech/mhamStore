import React, { useState } from "react";
import {
  View,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Animatable
import * as Animatable from "react-native-animatable";
//Color
import Colors from "../../../utils/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";

const { height } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT =
  Platform.OS === "android" ? 70 : height > 667 ? 80 : 50;
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
    <Animated.View
      style={styles.sss}>
    {/* <LinearGradient
      colors={['#E0E0E0', '#EEE', '#F9F9F9']}
      start={{x: 0.5, y: 0.5}}
      end={{ x: 0.5, y: 0.6}}
      style={{ borderRadius: 20, width: '100%', height: '35%', paddingTop: 10, marginBottom: 5,  }}
    > */}
    <Animatable.View delay={500} animation="fadeInDown" style={styles.container}>
      <View style={{...styles.topBar}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={25} color={Colors.water.blue} />
        </TouchableOpacity>        
      </View>      
      {!item.images || !item.images.length ?
        <Animated.Image
          source={{ uri: item.url }}
          style={styles.image}/>
          :
        <Animated.View style={styles.image}>
            <SliderBox
              images={item.images}
              autoplay={false}
              circleLoop={true}
              inactiveDotColor={'#ddd'}
              dotColor={'#000'}
              resizeMode={'contain'}
              imageLoadingColor={'white'}
            />
            {/* {isLoading ? <ActivityIndicator size="large" color={Colors.black} />: <></>} */}
        </Animated.View>
      }
    </Animatable.View>
  {/* </LinearGradient> */}
  </Animated.View>
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
    paddingTop: 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_MIN_HEIGHT,
    zIndex: 1000,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  image: {
    position: "absolute",
    top: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: "contain",
  },
});
