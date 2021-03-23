import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SectionList,
  Text,
  Platform,
  Dimensions,
  FlatList
} from "react-native";
import Animated, { Value } from "react-native-reanimated";
//Color
import Colors from "../../../utils/Colors";
import HorizontalItem from "./HorizontalItem";
import { Header } from "./Header";
import { Filter } from "./Filter";
//PropTypes check
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
// i18n
import { t } from "i18n-js"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");

// export const CategoryBody = ({navigation, productsFilter, searchFilterFunction, CategoryScreen}) => {
export const CategoryBody = (props) => {
  const [grid, setGrid] = useState(false)
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
        /**
         * {selected.length == 2 ?
            <FlatList
              key={'_'}
              keyExtractor={item => "_" + item.id}
              renderItem={this.renderLastItem}
              data={subGroups}
              numColumns={1} /> 
              :
            <FlatList
              key={'#'}
              keyExtractor={item => "#" + item.id}
              renderItem={this.renderItem}
              data={subGroups}
              numColumns={2} />
            }
         */
          grid ? 
          <AnimatedFlatList
            key={'_'}
            keyExtractor={(item, index) => "_" + index}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            ListHeaderComponent={
              <Filter
                DATA={DATA}
                image={image}
                scrollY={scrollY}
                grid={grid}
                setGrid={setGrid}
              />
            }
            onScroll={Animated.event([{nativeEvent: { contentOffset: { y: scrollY } }}], { useNativeDriver: true })}
            data={DATA}
            renderItem={item => (
              <View style={{ marginTop: 15, justifyContent: 'center' }}>
                <HorizontalItem key={item._id} item={item} navigation={props.navigation} />
              </View>
            )}
          />
          :
          <AnimatedFlatList
            key={'#'}
            keyExtractor={(item, index) => "#" + index}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            ListHeaderComponent={
              <Filter
                DATA={DATA}
                image={image}
                scrollY={scrollY}
                grid={grid}
                setGrid={setGrid}
              />
            }
            onScroll={Animated.event([{nativeEvent: { contentOffset: { y: scrollY } }}],{ useNativeDriver: true })}
            data={DATA}
            renderItem={item => (
              <View style={{ marginTop: 15, justifyContent: 'center' }}>
                <HorizontalItem key={item._id} item={item} navigation={props.navigation} />
              </View>
            )}
          />
        // </View>
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
    color: Colors.black,
  },
});
