import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
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
  CategorySection2,
  // categories,
} from "./components";
import CustomText from "../../components/UI/CustomText";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import Skeleton2 from "../../components/Loaders/SkeletonLoading2";
import Snackbar from "../../components/Notification/Snackbar";
//FloatButton
import { Provider } from "react-native-paper";
import RecentlySlide from "./components/RecentlySlide";

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

  const renderItem = ({item, index}) => {
    if(item.show === '0') return <View/>
    else {
      return (
        <CategorySection2
          name={item.name}
          bg={item.bg}
          image={item.image}
          data={products}
          navigation={navigation}
        />
      );
    }
  }

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

  const emptyData = [];

  return (
    <Provider>
      {isLoading ? <Skeleton2 /> : (
        <>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          />
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', height: '100%', marginTop: 52 }}>
            <Carousel />
            <View style={styles.slidesContainer}>
              <CustomText style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>SHOP THE MOST SMART ITEMS WITH US</CustomText>
            </View>
            {recently &&
              <>
                <CustomText style={styles.catText}>Recently</CustomText>
                <ScrollView
                  horizontal
                  snapToInterval={width}
                  decelerationRate='fast'
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  scrollEventThrottle={1}>
                  {slides.recently.map((slide, index) => {
                    return (
                      <View key={index}>
                        <RecentlySlide name={slide.name} bg={slide.bg} image={slide.image} price={slide.price} />
                      </View>
                    )
                  } )}
                </ScrollView>

                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  key={(item, index) => index.toString()}
                  data={categories.categories}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(item, index) => renderItem(item, index)}
                />
              </>
            }
          </ScrollView>
        </>
      )}
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  slidesContainer: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 2,
    padding: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catText: {
    fontSize: 13,
    marginStart: 14,
    marginEnd: 14,
    marginTop: 10,
    color: Colors.light_gold,
    fontWeight: "500",
  },
  backCircle: {
    width: 320,
    height: 320,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // borderRadius: 320 / 2,
    borderTopEndRadius: 320 / 2,
    borderBottomEndRadius: 320 / 2,
    // transform: [{ rotate: "45deg" }],
    marginStart: -60,
    marginTop: -150,
  },
  list: {
    width: "100%",
    marginTop: 50,
    paddingBottom: 20,
  },
});
