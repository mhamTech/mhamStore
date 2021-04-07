import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Field, reduxForm } from "redux-form";
import renderField from "./RenderField";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//PropTypes check
import PropTypes from "prop-types";
import { t } from "i18n-js";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = " Name cannot be blank";
  } else if (values.name.length < 6) {
    errors.name = "Name must be more than 6 characters";
  } else {
    errors.name = "";
  }
  if (!values.phone) {
    errors.phone = "Phone number cannot be blank";
  } else if (values.phone.length < 10) {
    errors.phone = "Phone number must be 10 characters at least";
  } else {
    errors.phone = "";
  }
  return errors;
};

const User = ({ getReceiver, checkValidation, initialValues }) => {
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // // console.log('initialValues', initialValues)

  useEffect(() => {
    getReceiver(initialValues.name || receiverName, initialValues.phone || phone);
  }, [initialValues.name || receiverName, initialValues.phone || phone]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{t("user.shipmentDetails")}</CustomText>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Field
            name="name"
            maxLength={35}
            label={t("user.fullname")}
            keyboardType="default"
            component={renderField}
            onBeforeInput={() => setReceiverName(initialValues.name)}
            onChangeText={(value) => setReceiverName(value) }
            checkValidation={checkValidation}
          />
          <Field
            name="phone"
            maxLength={12}
            label={t("user.phone")}
            component={renderField}
            onBeforeInput={() => setPhone(initialValues.phone)}
            onChangeText={(value) => setPhone(value) }
            keyboardType="numeric"
            returnKeyType="done"
            checkValidation={checkValidation}
          />

          {/* <Field
            name="address"
            maxLength={35}
            label={t("user.address")}
            component={renderField}
            onBeforeInput={() => setAddress(initialValues.address)}
            onChangeText={(value) => setAddress(value) }
            keyboardType="default"
            checkValidation={checkValidation}
          /> */}
        </View>
      </View>
    </View>
  );
};

User.propTypes = {
  getReceiver: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15,
    color: Colors.water.blue,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
export const UserForm = reduxForm({
  form: "user", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(User);
