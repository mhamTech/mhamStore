import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";

export const GridItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail3", { item: item.item })}>
      <View style={styles.itemContainer}>
          <Image
            style={{ height: 90, width: 90, resizeMode: "contain" }}
            source={{ uri: item.item.thumb }}
          />
          <CustomText numberOfLines={1} style={styles.title}>{item.item.filename}</CustomText>
          <View style={styles.rateContainer}>
            <Text numberOfLines={2} style={styles.score}>{item.item.description}</Text>
            <NumberFormat price={item.item.price} />
          </View>
        </View>
    </TouchableOpacity>
  );
};

GridItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    height: 200,
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
  title: {
    fontSize: 12,
  },
  rateContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  score: {
    fontSize: 12,
    color: Colors.grey,
    marginVertical: 5
  },
});