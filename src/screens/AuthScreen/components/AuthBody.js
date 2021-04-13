import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LoginScreen } from "../../LoginScreen";
import { SignupScreen } from "../../SignupScreen";
import CustomText from "../../../components/UI/CustomText";

const { width } = Dimensions.get("window");

export const AuthBody = ({ navigation, version }) => {
  const [Login, setLogin] = useState(true)
  return (
    <>
      <LinearGradient
        colors={['#015479', '#015479']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.linear}>
        <View style={styles.headerContainer}>
          <Image source={require("../../../assets/Images/logo1.png")} style={{ width: 50, height: 50 }} />
          <View style={styles.buttonsContainer}>
              
              <TouchableWithoutFeedback onPress={() => setLogin(true)} style={{ borderBottomWidth: Login ? 1 : 0, borderColor: Colors.white }}>
                <Text style={{ fontWeight: Login ? 'bold' : null, color: Colors.white, marginHorizontal: 10 }}>LOG IN</Text>
              </TouchableWithoutFeedback>

              <View/>

              <TouchableWithoutFeedback onPress={() => setLogin(false)} style={{ borderBottomWidth: Login ? 0 : 1, borderColor: Colors.white }}>
                <Text style={{ fontWeight: !Login ? 'bold' : null, color: Colors.white, }}>SIGN UP</Text>
              </TouchableWithoutFeedback>
            
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, width: '100%'}}>
          {Login ? 
            <>
              <CustomText style={styles.bigText}>Welcome back,</CustomText>
              <CustomText style={styles.text}>Login to Continue</CustomText>
            </>
            :
            <>
              <CustomText style={styles.bigText}>Hey, Get in board</CustomText>
              <CustomText style={styles.text}>Register to Continue</CustomText>
            </>
          }
        </View>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', width: '100%', borderWidth: 0, }}>
            <View style={{ width: '80%' }}>
              {Login ?
                <LoginScreen navigation={navigation} />
              :
                <SignupScreen setLogin={setLogin} navigation={navigation} />
              }
            </View>
          </View>
          <View style={{ width: '100%', marginTop: 50, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ color: Colors.gray }}>Version {version}</Text>
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
  linear: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  card: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '70%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    // shadows
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  bigText: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 3,
    color: Colors.white
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
    color: Colors.white
  },
  logo: {
    resizeMode: "contain",
    width: 250,
    height: 100,
  },
});
