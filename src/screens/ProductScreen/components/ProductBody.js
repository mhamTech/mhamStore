import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
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
  const DATA = [];
  const mobiles = productsFilter.filter((mobile) => mobile.type === "mobile");
  const watches = productsFilter.filter((watch) => watch.type === "watch");
  // const bags = productsFilter.filter((bag) => bag.type === "bag");
  DATA.push({ title: "Mobiles", data: mobiles });
  DATA.push({ title: "Watches", data: watches });
  // DATA.push({ title: "bags", data: bags });
  const scrollY = new Value(0.01);
  const sectionListRef = useRef(null);

  // function getItems() {
  //   let items = [];
  //   items = productsFilter.filter((item) => )
  // }

  // const scrollToSection = (index) => {
  //   sectionListRef.current.scrollToLocation({
  //     animated: true,
  //     sectionIndex: index,
  //     itemIndex: 0,
  //     viewPosition: 0,
  //   });
  // };
  // const [sectionIndex, setIndex] = useState(0);
  // const HandleScrollY = (event) => {
  //   const y = event.nativeEvent.contentOffset.y;
  //   const sectionIndex =
  //     y > books.length * ITEM_HEIGHT &&
  //     y < (books.length + rings.length) * ITEM_HEIGHT
  //       ? 1
  //       : y > (books.length + rings.length) * ITEM_HEIGHT
  //       ? 2
  //       : 0;
  //   setIndex(sectionIndex);
  // };

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
        // console.log('productsFilter', productsFilter),
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
            // { listener: HandleScrollY, useNativeDriver: false }
          )}
          contentContainerStyle={{ marginTop: 0, paddingBottom: 100 }}
        />
        // null
      )}
      {/* <View style={styles.tabBar}>
        <FlatList
          data={sectionTitle}
          keyExtractor={(item, index) => item + index}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            const color = index === sectionIndex ? "#7dd170" : Colors.white;
            const textColor =
              index === sectionIndex ? Colors.white : Colors.black;
            console.log(index);
            return (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 120,
                  backgroundColor: color,
                  borderRadius: 5,
                }}
                onPress={() => {
                  scrollToSection(index);
                }}
              >
                <CustomText style={{ fontSize: 16, color: textColor }}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
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
    color: Colors.lighter_gold,
  },
});
