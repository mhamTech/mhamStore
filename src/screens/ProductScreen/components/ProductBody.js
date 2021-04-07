import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SectionList,
} from "react-native";
import Animated, { Value } from "react-native-reanimated";
//Color
import Colors from "../../../utils/Colors";
import HorizontalItem from "./HorizontalItem";
import CustomText from "../../../components/UI/CustomText";
import { Header } from "./Header";
//PropTypes check
import PropTypes from "prop-types";

ITEM_HEIGHT = 100;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export const ProductBody = ({navigation, productsFilter, searchFilterFunction}) => {
  var categories = useSelector((state) => state.category);
  const DATA = [];
  const mobiles = productsFilter.filter((mobile) => mobile.type === "mobile");
  const watches = productsFilter.filter((watch) => watch.type === "watch");
  const bags = productsFilter.filter((bag) => bag.type === "bag");
  DATA.push({ title: "Mobiles", data: mobiles });
  DATA.push({ title: "Watches", data: watches });
  DATA.push({ title: "Bags", data: bags });

  const DATA2 = [];
  categories.categories.filter(category => DATA2.push({ title: category.name, data: '' }));

  const scrollY = new Value(0.01);
  const sectionListRef = useRef(null);

  return (
    <View style={{...styles.container}}>
      <View style={{ height: 200}}>
      <TouchableWithoutFeedback>
        <Header
          navigation={navigation}
          searchFilterFunction={searchFilterFunction}
          scrollY={scrollY}
        />
      </TouchableWithoutFeedback>
      </View>
      {productsFilter.length === 0 ? (
        <CustomText style={{ textAlign: "center", marginTop: 110 }}>
          No product found
        </CustomText>
      ) : (
        <AnimatedSectionList
          sections={DATA} // REQUIRED: SECTIONLIST DATA
          keyExtractor={(item) => item._id}
          ref={sectionListRef}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{...styles.header, backgroundColor: null}}>
              <CustomText style={styles.title}>{title}</CustomText>
            </View>
          )}
          renderItem={({ item }) => (
            <HorizontalItem item={item} navigation={navigation} />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ marginTop: 0, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: Colors.black,
  },
});
