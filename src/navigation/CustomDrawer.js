import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Text,
  Platform,
  Button,
  I18nManager,
  Switch,
} from "react-native";
//Drawer
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "react-native-paper";
//Color
import Colors from "../utils/Colors";
import CustomText from "../components/UI/CustomText";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Action
import { Logout as LogoutAction } from "../reducers";
//Link
import { OpenURL } from "../utils/Tools";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import * as Updates from 'expo-updates';

//change lang

const fbURL = "https://www.facebook.com/";
const youtubeURL = "https://www.youtube.com/";

//custom drawer content
export default (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  // isEnabled ? Updates.reloadAsync(): null;

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [error, setError] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Logout = () => {
    Alert.alert("Log out", "Are you sure you want to log out??", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "confirm",
        onPress: () => {
          dispatch(LogoutAction());
          props.navigation.navigate("Home");
        },
      },
    ]);
  };
  const { state, ...rest } = props;
  const newState = { ...state }; //copy from state before applying any filter. do not change original state
  // newState.routes = newState.routes.filter((item) => item.name !== 'Profile'); //replace "Login' with your route name

  React.useEffect(() => {
    fetch(user.profilePicture)
  .then(response => {
    if(!response.ok){ 
      setError(true)
    }
  })
  .catch(error => {
    console.log(error)
  });
  }, []);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {Object.keys(user).length === 0 ? (
          <View style={styles.profileContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/Images/logo1.png")}
            />
          </View>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Image
                  style={styles.profilePic}
                  source={ 
                    error
                      ? require("../assets/Images/defaultprofile.jpg")
                      // : require("../assets/Images/defaultprofile.jpg")
                      : { uri: user.profilePicture }
                  }
                />
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    marginTop: 10,
                    color: Colors.water.blue,
                    fontSize: 22,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                  }}
                >
                  {user.name}
                </Text>
              </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'space-around' }}>
            <CustomText style={{ color: Colors.water.blue }}>EN</CustomText>
            <Switch
              trackColor={{ false: Colors.water.white, true: Colors.water.white }}
              thumbColor={Colors.water.blue}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <CustomText style={{ color: Colors.water.blue }}>AR</CustomText>
          </View>
          <DrawerItemList state={newState} {...rest} />
          <Drawer.Section style={styles.drawerSection}/>
          {/* <View style={styles.social}>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                // source={require("../assets/Images/social1.png")}
              />
            </OpenURL>
            <OpenURL url={youtubeURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                // source={require("../assets/Images/social3.png")}
              />
            </OpenURL>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                // source={require("../assets/Images/social2.png")}
              />
            </OpenURL>
          </View> */}
        </View>
      </DrawerContentScrollView>
      {Object.keys(user).length === 0 ? (
        <></>
      ) : (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                style={{ marginRight: 30 }}
                color={Colors.red}
              />
              <CustomText
                style={{
                  fontSize: 14,
                  color: Colors.red,
                  fontWeight: "500",
                  fontFamily: "Roboto-Medium",
                }}
              >
                Log out
              </CustomText>
            </View>
          )}
        />
      )}

      <View style={styles.version}>
        <DrawerItem
          label={() => (
            <CustomText
              style={{ color: Colors.grey, fontFamily: "Roboto-LightItalic" }}
            >
              Mham App Version 1.0
            </CustomText>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    paddingVertical: 50,
    marginTop: -10,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.3,
    borderColor: '#000'
  },
  logo: {
    resizeMode: "contain",
    width: "80%",
    height: 100,
  },
  logoutSection: {
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 10,
  },
  social: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  version: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
});
