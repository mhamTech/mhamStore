import React, { useState, useRef, useEffect } from "react";
import { Field, isValid, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { Ionicons, AntDesign } from "@expo/vector-icons";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { SignUp as SignUpAccount } from "../../../reducers";
//PropTypes check
import PropTypes from "prop-types";
import renderField from "./RenderField";
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get("window");

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  if (!values.password) {
    errors.password = "Password cannot be empty";
  } else if (values.password.length < 6) {
    errors.password = "Password must be more than or equal to 6 characters";
  }
  // if (!values.confirmpassword) {
  //   errors.confirmpassword = "Password cannot be empty";
  // } else if (values.confirmpassword !== values.password) {
  //   errors.confirmpassword = "Confirmation password does not match";
  // }
  if (!values.username) {
    errors.username = " Name cannot be blank";
  } else if (values.username.length > 20) {
    errors.username = "Name must not exceed 20 characters";
  } else if (values.username.length < 6) {
    errors.username = "Name must be more than 6 characters";
  }

  return errors;
};

const Signup = (props) => {
  const { handleSubmit, reset } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const [showPass, setShowPass] = useState(false);
  const [valid, setIsValid] = useState(null);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const submit = async (values) => {
    try {
      await dispatch(SignUpAccount(values.username, values.email, values.password));
      reset();
      if (!unmounted.current) {
        showMessage({
          message: 'Registered successfully',
          type: 'success',
          duration: 1500
        })
        props.setLogin(true)
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
      // keyboardVerticalOffset={40} // adjust the value here if you need more padding
      // style={{ flex: 1 }}
    >
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}
      >
        <Ionicons name="ios-arrow-back" size={35} color={Colors.black} />
      </TouchableOpacity> */}

      {/* <View style={styles.header}></View> */}
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 10,
              zIndex: 0,
            }}
          >
            <View>
              <CustomText style={styles.title}>REGISTER</CustomText>
            </View>
            <View>
              <Field
                name="username"
                keyboardType="default"
                label="Your Name"
                component={renderField}
                icon="id-card"
                autoCapitalize={true}
              />
              <Field
                name="email"
                keyboardType="email-address"
                label="Email"
                icon="email"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Password"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="pass"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
                // onChange={(val) => alert(val)}
              />
              {/* <Field
                name="confirmpassword"
                keyboardType="default"
                label="Confirm Password"
                component={renderField}
                secureTextEntry={showConfirmPass ? false : true}
                passIcon="confirm"
                icon="lock"
                showConfirmPass={showConfirmPass}
                setshowConfirmPass={setshowConfirmPass}
              /> */}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: "center" }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>Register</CustomText>
                )}
              </View>
            </TouchableOpacity>
            {/* <View style={{ flex: 1 }} /> */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Testing... */}
      {/* <View style={{
          width: '100%',
          borderWidth: 0,
          height: '20%',
          // justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <View style={{ borderWidth: 0, paddingHorizontal: 10, width: '100%', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 10 }}>Including 3 of the following:</Text>
            <View style={{ flexDirection: 'row', marginTop: 1, justifyContent: 'space-between', width: '50%', }}>
              <AntDesign name={'checkcircle'} color={isValid && isValid[0] ? 'green' : 'grey'} />
              <Text style={{ fontSize: 8 }}>ABC</Text>
              <AntDesign name={'checkcircle'} color={isValid && isValid[1] ? 'green' : 'grey'} />
              <Text style={{ fontSize: 8 }}>abc</Text>
              <AntDesign name={'checkcircle'} color={isValid && isValid[2] ? 'green' : 'grey'} />
              <Text style={{ fontSize: 8 }}>123</Text>
              <AntDesign name={'checkcircle'} color={isValid && isValid[3] ? 'green' : 'grey'} />
              <Text style={{ fontSize: 8 }}>@#$</Text>
            </View>
          </View>
      </View> */}

    </KeyboardAvoidingView>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  header: {
    marginTop: height * 0.15,
    width: width,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.water.blue,
    marginTop: 10,
  },
  title: {
    color: Colors.water.blue,
    fontSize: 40,
    letterSpacing: 5,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Roboto-Medium",
  },
  textSignSmall: {
    color: Colors.black,
    textAlign: "center",
  },
});
export const SignupForm = reduxForm({
  form: "signup", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Signup);
