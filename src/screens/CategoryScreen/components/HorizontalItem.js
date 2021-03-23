import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  Dimensions
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";
//icon
import { AntDesign } from "@expo/vector-icons";
//Text
import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
const { width } = Dimensions.get('screen');

const HorizontalItem = ({ item, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    // <View style={styles.container}>
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail3", { item: item.item })}>
      <View style={styles.itemContainer}>
          <View
            style={styles.imageContainer}>
            {/* {isLoading ? <ActivityIndicator size="small" color={Colors.grey}/> : */}
              <Image
                style={{ height: 90, width: "100%", resizeMode: "contain" }}
                source={{ uri: item.item.thumb }}
                // onLoadStart={() => setIsLoading(true)}
                // onLoadEnd={() => setIsLoading(false)}
                // onLoad={() => setIsLoading(false)}
              />
          </View>
          <View style={styles.info}>
            <CustomText style={styles.title}>{item.item.filename}</CustomText>
            <CustomText style={styles.subText}></CustomText>
            <View style={styles.rateContainer}>
              <View style={styles.rate}>
                {/* <AntDesign name="star" color="#fed922" size={15} /> */}
                <Text numberOfLines={3} style={styles.score}>{item.item.description}</Text>
              </View>
              <NumberFormat price={item.item.price} />
            </View>
          </View>
      </View>
    {/* </View> */}
    </TouchableOpacity>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    flexDirection: "row",
    height: 120,
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 8,

    // shadows
    // ios
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    // android
    elevation: 5
  },
  imageContainer: {
    width: "40%",
    borderRadius: 5,
    paddingVertical: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    borderRadius: 5,
    height: "100%",
    justifyContent: "flex-start",
    justifyContent: 'space-evenly',
    width: "60%",
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,
    color: Colors.grey,
    marginVertical: 10,
  },
  rateContainer: {    
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
});

export default HorizontalItem;
