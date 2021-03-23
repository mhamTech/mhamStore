import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LoginForm } from "../../LoginScreen/components";
import { SignupForm } from "../../SignupScreen/components";

const { height, width } = Dimensions.get("window");

export const AuthBody = ({ navigation }) => {
  const [Login, setLogin] = useState(true)
  return (
    <>
      <LinearGradient
        colors={['#015479', '#d5dfe3']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
      <View style={styles.card}>
        {/* <Image source={require('../../../assets/Images/logo.png')} /> */}
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback onPress={() => setLogin(true)} style={{ borderBottomWidth: Login ? 1 : 0, borderColor: Colors.water.blue }}>
            <Text style={{ fontWeight: Login ? 'bold' : null, color: Colors.water.blue, marginHorizontal: 10 }}>LOG IN</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setLogin(false)} style={{ borderBottomWidth: Login ? 0 : 1, borderColor: Colors.water.blue }}>
            <Text style={{ fontWeight: !Login ? 'bold' : null, color: Colors.water.blue, }}>SIGN UP</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ width: '80%', borderWidth: 0, marginTop: 20, marginBottom: 60 }}>
          {Login ? 
            <LoginForm navigation={navigation} />
          :
            <SignupForm setLogin={setLogin} navigation={navigation} />
          }
        </View>
      </View>
      </LinearGradient>
    </>
  );
};

AuthBody.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  signinContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.black,
  },
  card: {
    backgroundColor: Colors.white,
    width: '90%',
    height: '75%',
    // paddingTop: 40,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 15,
    // shadows
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  logo: {
    resizeMode: "contain",
    width: 250,
    height: 100,
  },
});
