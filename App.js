import React, { useState } from "react";
//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import {
  authReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  productReducer,
  categoryReducer,
  recentlyReducer
} from "./src/reducers";
// import CartNoAuthReducer from './src/reducerTest/CartNoAuthReducer'
//Navigator
import { AppNavigator } from "./src/navigation";
import { AppLoading } from "expo";
// import { Asset } from "expo-asset";
import * as Font from "expo-font";

//redux form
import { reducer as formReducer } from "redux-form";
import { StatusBar } from "expo-status-bar";
//prevent RTl
// import { I18nManager, NativeModules, Platform } from "react-native";
// import { Updates } from "expo";
//Notification
// import LocalNotication from "./src/components/Notification/LocalNotification";

// import i18n from "./src/I18n"

const rootReducer = combineReducers({
  store: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  fav: favoriteReducer,
  category: categoryReducer,
  recentlyReducer: recentlyReducer,
  form: formReducer,
});
//store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
const LoadAssets = async () => {
  // const imageAssets = Asset.loadAsync([
  //   require("./src/assets/Images/banner1.jpg"),
  //   require("./src/assets/Images/banner3.jpg"),
  //   require("./src/assets/Images/banner4.jpg"),
  //   require("./src/assets/Images/banner5.jpg"),
  //   require("./src/assets/Images/banner6.jpg"),
  //   require("./src/assets/Images/bg1.jpg"),
  //   require("./src/assets/Images/bg2.jpg"),
  //   require("./src/assets/Images/bg3.jpg"),
  //   require("./src/assets/Images/defaultprofile.jpg"),
  //   require("./src/assets/Images/flower3.jpg"),
  //   require("./src/assets/Images/logoNoText.png"),
  //   require("./src/assets/Images/logo1.png"),
  //   require("./src/assets/Images/logoTextWhite.png"),
  //   require("./src/assets/Images/slide1.png"),
  //   require("./src/assets/Images/slide2.png"),
  //   require("./src/assets/Images/slide3.png"),
  //   require("./src/assets/Images/social1.png"),
  //   require("./src/assets/Images/social2.png"),
  //   require("./src/assets/Images/social3.png"),
  //   require("./src/assets/Images/creditcards.png"),
  //   require("./src/assets/Images/faceid.png"),
  // ]);
  const fetchFonts = Font.loadAsync({
    "Roboto-Bold"        : require("./src/assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic"  : require("./src/assets/Fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic"      : require("./src/assets/Fonts/Roboto-Italic.ttf"),
    "Roboto-LightItalic" : require("./src/assets/Fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium"      : require("./src/assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./src/assets/Fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular"     : require("./src/assets/Fonts/Roboto-Regular.ttf"),
  });

  return await Promise.all([fetchFonts]);
};
// I18nManager.forceRTL(true);

export default function App() {
  const [assetLoaded, setAssetLoaded] = useState(false);
  //prevent Rtl
  // React.useEffect(() => {
      // I18nManager.allowRTL(true);
      // I18nManager.forceRTL(true);
      // Updates.reload();
  // }, []);

  // I18nManager.forceRTL(true)

  if (!assetLoaded) {
    return (
      <AppLoading
        startAsync={LoadAssets}
        onFinish={() => setAssetLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar />
      {/* <LocalNotication /> */}
      <AppNavigator />
    </Provider>
  );
}
