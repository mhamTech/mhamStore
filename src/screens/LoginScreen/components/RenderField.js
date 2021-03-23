import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <View>
        <TextInput
          placeholder={label}
          placeholderTextColor={Colors.water.light_blue}
          autoCapitalize='none'
          mode='flat'
          clearButtonMode={passIcon ? "never" : "always"}
          selectionColor={Colors.black}
          theme={{ colors: { primary: Colors.black } }}
          left={
            <TextInput.Icon
              name={icon}
              size={24}
              color={Colors.water.blue}
              style={{ paddingRight: 10 }}
            />
          }
          style={{
            fontSize: 14,
            backgroundColor: "transparent",
            marginVertical: 5,
            // paddingHorizontal: 5,
          }}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {passIcon ? (
          <MaterialCommunityIcons
            name={showPass ? "eye" : "eye-off"}
            size={24}
            color={Colors.water.blue}
            onPress={() => {
              setShowPass((prev) => !prev);
            }}
            style={{
              position: "absolute",
              top: "40%",
              right: 10,
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}
      </View>
      {touched && error && (
        <CustomText
          style={{ color: "red", marginHorizontal: 15, marginTop: 5 }}
        >
          {error}
        </CustomText>
      )}
    </View>
  );
};
