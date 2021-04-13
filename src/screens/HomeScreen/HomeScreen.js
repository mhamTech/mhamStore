import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Alert,
  Text,
  RefreshControl
} from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchProducts, fetchRecentlyCategories, clearRecently as clear } from "../../reducers";
//Animation
import Animated from "react-native-reanimated";
//Components
import {
  Header,
  FlatListHeaderComponent,
  FlatListFooterComponent
} from "./components";
import Skeleton2 from "../../components/Loaders/SkeletonLoading2";
import Snackbar from "../../components/Notification/Snackbar";
import { showMessage } from 'react-native-flash-message';
import { Provider } from "react-native-paper";
import Colors from "../../utils/Colors";

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
  const [imageLoading, isImageLoading] = useState(false);

  const clearRecently = () => {
    Alert.alert("Clear recently", "Are you sure",
    [
      {
        text: "OK",
        onPress: async () => {
          try {
            await dispatch(clear());
            fetching();
          } catch (error) {
            showMessage({
              message: 'Something went happen while deleting recently try again later',
              type: 'warning',
              duration: 1500
            })
          }
        }
      },
      {
        text: "Cancel",
        style: "cancel"
      }
    ])
  }

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
          <FlatList
            keyExtractor={(item, index) => '_' + index}
            refreshControl={
              <RefreshControl
                onRefresh={fetching}
                refreshing={isLoading}
                colors={Colors.water2}
                progressViewOffset={50}
              />
            }
            ListHeaderComponent={
              <FlatListHeaderComponent
                clearRecently={clearRecently}
                recently={recently}
                navigation={navigation}
                slides={slides}
                categories={categories.categories} // for footer component
                products={products}
              />
            }
            horizontal={false}
            data={categories.categories}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              <FlatListFooterComponent
                products={products}
                navigation={navigation}
                imageLoading={imageLoading}
                isImageLoading={isImageLoading}
              />}
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