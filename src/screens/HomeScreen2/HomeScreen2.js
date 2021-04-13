import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  RefreshControl,

} from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchProducts, fetchRecentlyCategories } from "../../reducers";
//Colors
import Colors from "../../utils/Colors";
//Animation
import Animated from "react-native-reanimated";
//Components
import {
  Carousel,
  Header,
  CategorySection,
  FloatButton,
  CategorySection2,
  // categories,
} from "./components";
import CustomText from "../../components/UI/CustomText";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import Skeleton2 from "../../components/Loaders/SkeletonLoading2";
import Snackbar from "../../components/Notification/Snackbar";
//FloatButton
import { Portal, Provider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import RecentlySlide from "./components/RecentlySlide";
// i18n
import { t } from "i18n-js";
import i18n from "../../I18n"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");


export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //Header Animation
  let scrollY = new Animated.Value(0.01);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const categories = useSelector((state) => state.category);  
  const isLoading = useSelector((state) => state.store.isLoading);
  const slides = useSelector((state) => state.recentlyReducer);
  const notification = useSelector((state) => state.auth.notification);
  const [ recently, setRecently ] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  // i18n.locale = 'en'

  //fetch Api
  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(fetchCategories());
        await dispatch(fetchProducts());
        await dispatch(fetchRecentlyCategories());
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, [user.userid]);

  const data = [
    { name: 'name1', bg: '#fff' },
    { name: 'name2', bg: '#fff' },
    { name: 'name3', bg: '#fff' },
    { name: 'name4', bg: '#fff' },
    { name: 'name5', bg: '#fff' },
    { name: 'name6', bg: '#fff' },
    { name: 'name7', bg: '#fff' },
    { name: 'name8', bg: '#fff' },
    { name: 'name9', bg: '#fff' },
    { name: 'name10', bg: '#fff' },
    { name: 'name11', bg: '#fff' },
    { name: 'name12', bg: '#fff' },
  ];

  const scrollX = useRef(new Animated.Value(0.01)).current;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchCategories())
    setRefreshing(false);


  }, []);

  return (
    <Provider>
      {isLoading ? (
        <Skeleton2 />
      ) : (
        <View style={styles.container}>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
            />
          <Portal>
            <FloatButton />
          </Portal>
          <View>
            <AnimatedFlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}
              ListHeaderComponent={() => (
                <View style={styles.banner}>
                  <TouchableOpacity onPress={() => setRecently(!recently)}>
                    {/* <Carousel /> */}
                  </TouchableOpacity>
                  {recently && <>
                  <CustomText style={{...styles.catText, marginBottom: 0, marginTop: 10 }}>Recently</CustomText>
                  <Animated.ScrollView
                    horizontal
                    snapToInterval={width}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                      [
                        {
                          nativeEvent: { contentOffset: { x: scrollX } }
                        }
                      ],
                      {
                        useNativeDriver: false
                      }
                    )}
                  >
                    {slides.recently.map((slide, index) => {
                      return (
                        <View key={index} style={styles.slideContainer}>
                          <RecentlySlide name={slide.name} bg={slide.bg} image={slide.image} />
                        </View>
                      )
                    } )}
                  </Animated.ScrollView>
                  </>
                  }
                  <CustomText style={styles.catText}>Categories</CustomText>
                </View>
              )}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: scrollY } },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={categories.categories}
              // numColumns={2}
              key={item => item.name}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.categoryContainer}>
                  <CategorySection2
                    name={item.name}
                    bg={item.bg}
                    image={item.image}
                    data={products}
                    navigation={navigation}
                  />
                </View>
              )}
            />
          </View>
          {Object.keys(notification).length === 0 ? (
            <View />
          ) : (
            <Snackbar
              checkVisible={true}
              message={
                Object.keys(user).length === 0 ?
                  notification
                  :
                  notification + " " + user.name
              }
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  banner: {
    marginBottom: 15,
  },
  slideContainer: {
    marginHorizontal: 18,
    justifyContent: 'space-between',
    marginVertical: 5,
    borderRadius: 20,
    height: 152,
    width: 110,
    flex: 0.8
  },
  categoryContainer: {
    marginHorizontal: 18,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    backgroundColor: 'white',
    height: height / 5.5,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  catText: {
    fontSize: 12,
    // marginBottom: -10,
    marginStart: 8,
    marginEnd: 8,
    marginVertical: 8,
    color: Colors.black,
    fontWeight: "500",
  },
  list: {
    width: "100%",
    marginTop: 50,
    paddingBottom: 55,
  },
});
