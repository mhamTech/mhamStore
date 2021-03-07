import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
//Animatable
import * as Animatable from "react-native-animatable";
//icon
import { AntDesign, FontAwesome } from "@expo/vector-icons";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
//number format
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { RadioButtons } from 'react-native-radio-buttons'

const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item, color }) => {
  return (
    <View style={[styles.footer]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={2000}
        style={styles.footer_header}>
        <CustomText selectable={true} style={{ ...styles.title }}>
          {item.filename}
        </CustomText>
        <NumberFormat
          style={{ color: "#000", fontSize: 13, backgroundColor: null }}
          price={item.price}
          // color={color}
        />
      </Animatable.View>
      <View style={{ flexDirection: "row-reverse", marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 10 }}> 4.5</Text>
        <Animatable.View animation="bounceIn" delay={1600}>
          <FontAwesome name="star-half-empty" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1700}>
          <FontAwesome name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1800}>
          <FontAwesome name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1900}>
          <FontAwesome name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={2000}>
          <FontAwesome name="star" size={15} color={color} />
        </Animatable.View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={1000}
        style={styles.description}
      >
        {/* <CustomText
          style={{
            // ...styles.title,
            fontWeight: "500",
            marginTop: 20,
            marginBottom: 10,
            // textDecorationLine: "underline",
          }}
        >
          Details:
        </CustomText> */}

        {/* Colors radio button */}

        {/* <View style={{...styles.infoContainer, flexDirection: 'column' }}>
          <CustomText>Color options: </CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '30%'}}>
            <RadioButtons
              options={ options }
              onSelection={ setSelectedOption.bind(this) }
              selectedOption={selectedOption }
              renderOption={ renderOption }
              renderContainer={ renderContainer }
            />
          </View>
        </View> */}
        
        <CustomText
          style={{ fontWeight: "bold"}}>
          description
        </CustomText>
        <CustomText style={{ color: color }} selectable={true}>
          {item.description}
        </CustomText>
      </Animatable.View>
    </View>
  );
};

DetailBody.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    // top: 25,
    width,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 2,
  },
  footer_header: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    width: '50%',
  },
  title: {
    fontSize: 17,
    color: Colors.text,
  },
  detail: {
    fontSize: 15,
    // lineHeight: 20,
  },

  price: {
    color: "#fff",
  },
  description: {
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});
