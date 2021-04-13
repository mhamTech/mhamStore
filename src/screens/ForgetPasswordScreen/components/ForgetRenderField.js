import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";

export default renderField = ({
  keyboardType,
  icon,
  label,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View style={{ marginTop: 30 }}>
      <TextInput
        placeholder={label}
        placeholderTextColor={Colors.water.light_blue}
        autoCapitalize='none'
        clearButtonMode='always'
        mode='flat'
        selectionColor={Colors.water.blue}
        theme={{ colors: { primary: Colors.water.blue } }}
        left={
          <TextInput.Icon
            name={icon}
            size={24}
            color={Colors.water.blue}
            style={{ paddingRight: 10, backgroundColor: "transparent", }}
          />
        }
        style={{ fontSize: 14 }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && (
          <CustomText style={{ color: Colors.red }}>{error}</CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: Colors.red }}>{warning}</CustomText>
          )))}
    </View>
  );
};
