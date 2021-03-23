import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
} from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchProducts, fetchRecentlyCategories } from "../../reducers";
//Animation
import Animated from "react-native-reanimated";
//Components
import {
  Header,
  CategorySection2,
  FlatListHeaderComponent
} from "./components";
import Skeleton2 from "../../components/Loaders/SkeletonLoading2";
import Snackbar from "../../components/Notification/Snackbar";
import { showMessage } from 'react-native-flash-message';
import { Provider } from "react-native-paper";

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
  const [ recently, setRecently ] = useState(null);

  const fetching = async () => {
    try {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
      await dispatch(fetchRecentlyCategories());
    } catch (err) {
      // alert(err);
      showMessage({
        message: "Something went happen while getting the data, Please try again",
        type: 'danger',
        duration: 2500,
        position: 'center',
        style: { borderWidth: 1.2, borderColor: '#800000', width: '95%', height: 75 }
      })
      // TODO: delete it
      console.log(`error - HomeScreen => useEffect => fetching()`, err)
    }
  };
  //fetch Api
  useEffect(() => {
    fetching();
  }, [user.userid]);

  useEffect(() => {
    setRecently(slides.recently.length ? true : false)
  }, [slides.recently.length])

  return (
    <Provider>
      {isLoading ? <Skeleton2 /> : (
        <>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          />
          {/* categories list */}
          <FlatList
            keyExtractor={(item, index) => '_' + index}
            onRefresh={fetching}
            refreshing={isLoading}
            ListHeaderComponent={ 
              <FlatListHeaderComponent
                recently={recently}
                navigation={navigation}
                slides={slides}
              />
            }
            horizontal={false}
            data={categories.categories}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if(item.show === '0') return <View/>
              else
                return (
                  <CategorySection2
                    key={index}
                    name={item.name}
                    bg={item.bg}
                    image={item.image}
                    data={products}
                    navigation={navigation}
                  />
                );
            }}
          />
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