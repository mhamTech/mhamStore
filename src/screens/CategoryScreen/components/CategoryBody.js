import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
  Text,
  Platform,
  Image,
  StatusBar,
  Dimensions
} from "react-native";
import Animated, { Value } from "react-native-reanimated";
import { Ionicons, Feather } from "@expo/vector-icons";
//Color
import Colors from "../../../utils/Colors";
import HorizontalItem from "./HorizontalItem";
import CustomText from "../../../components/UI/CustomText";
import { Header } from "./Header";
import { Filter } from "./Filter";
//PropTypes check
import PropTypes from "prop-types";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
// i18n
import { t } from "i18n-js"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const { width, height } = Dimensions.get("window");

// export const CategoryBody = ({navigation, productsFilter, searchFilterFunction, CategoryScreen}) => {
export const CategoryBody = (props) => {
  const DATA = props.DATA;
  const image = props.image;

  const scrollY = new Value(0.01);

  return (
    <View style={{...styles.container}}>
      <View style={{ height: 100}}>
      <TouchableWithoutFeedback>
        <Header
          navigation={props.navigation}
          scrollY={scrollY}
          CategoryName={props.CategoryName}
        />
      </TouchableWithoutFeedback>
      </View>
      {/* <View style={{ width: '100%', borderColor: '#a6a6a6', borderWidth: 1,}} /> */}
      {!DATA.length ?
      // TODO: add lottie to android
      Platform.OS === 'ios' ?
      <View style={{ height: '100%', width: '100%', alignItems: 'center', marginTop: 120 }}>
        <Text>{t("categoryBody.noProducts")}</Text>
        <LottieView
          source={require("../../../components/IconAnimation/empty.json")}
          autoPlay
          loop
        />
        </View> :
        <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
          <Text>{t("categoryBody.noProducts")}</Text>
        </View>
        :
        <>
          {/* <Filter
            DATA={DATA}
            image={image}
            scrollY={scrollY}
          /> */}
          <AnimatedFlatList
            contentContainerStyle={{ borderWidth: 0, }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            ListHeaderComponent={
              <Filter
                DATA={DATA}
                image={image}
                scrollY={scrollY}
              />
            }
            onScroll={Animated.event(
              [{nativeEvent: { contentOffset: { y: scrollY } }}],{ useNativeDriver: true })}
            keyExtractor={item => item._id}
            data={DATA}
            renderItem={item => (
              <View style={{ marginTop: 5, height: height / 6, justifyContent: 'center', width: width / 1.005, paddingEnd: 30 }}>
                <HorizontalItem key={item._id} item={item} navigation={props.navigation} />
              </View>
            )}
          />
        </>
      }
    </View>
  );
};

CategoryBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  DATA: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  tabBar: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.lighter_gold,
  },
});
