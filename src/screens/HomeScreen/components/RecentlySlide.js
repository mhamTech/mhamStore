import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Colors from "../../../utils/Colors";
import { View, Dimensions, StyleSheet, Image, } from "react-native";
import CustomText from "../../../components/UI/CustomText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

export const RecentlySlide = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail3', {item})} style={styles.container}>
      <LinearGradient
        colors={Colors.water2}
        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
        style={styles.linear}
      >
        <Image source={{ uri: item.thumb }} style={styles.image} />
      </LinearGradient>
      <CustomText style={styles.text}>{item.price} SAR</CustomText>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: 'center'
  },
  linear: {
    padding: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // shadows
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 8
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  text: {
    color: 'red',
    fontSize: 10
  },
});
