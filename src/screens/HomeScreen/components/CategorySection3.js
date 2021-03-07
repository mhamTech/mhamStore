import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  Image
} from "react-native";
import { fetchCategories } from "../../../reducers";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";

//Translation

//PropTypes check
import PropTypes from "prop-types";
import { ScrollView } from "react-native-gesture-handler";

export const CategorySection2 = ({ data, name, bg, navigation, image }) => {
  const DATA = data.filter((item) => name.toLowerCase().includes(item.type));

  return (
    <TouchableOpacity
        style={styles.touch}
        onPress={() => {navigation.navigate("Category", {
          screen: "CategoryScreen",
          params: {
            categoryName: name,
            DATA: DATA
          }
        })} }
        >
    <View style={styles.category}>
      <Image
        source={{ uri: image }}
        style={{...styles.image, resizeMode: 'cover' }}>
        </Image>
        {/* <View style={{ ...styles.titleHeader, backgroundColor: 'rgba(0, 0, 0, 0.33)', borderRadius: 8, paddingHorizontal: 8 }}> */}
        {/* <View style={{ ...styles.titleHeader, borderRadius: 8, paddingHorizontal: 8 }}> */}
          {/* <CustomText style={styles.title}>{name}</CustomText> */}
        {/* </View> */}
    </View>
    </TouchableOpacity>
  );
};

CategorySection2.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    touch: {
      // paddingHorizontal: 8,
      width: width,
      borderRadius: 8,
    },
    category: {
      width: '30%',
      borderRadius: 8,
      flexDirection: 'row',
    },
    image: {
      borderWidth: 1,
      borderColor: 'blue',

      resizeMode: 'contain',
      borderRadius: 8,
      height: 100,
      width: 100,
    },
    titleHeader: {
      marginHorizontal: 10,
      marginBottom: 5,
      alignItems:'flex-start'
    },
    title: {
      fontSize: 28,
      color: 'white',
      fontWeight: "500",
    },
    list: {
      justifyContent: "space-between",
    },
    productList: {
      width: "100%",
      marginTop: 2,
      paddingHorizontal: 10,
    },
    seeMore: {
      // backgroundColor: "rgba(255, 255, 255, 0.9)",
      width: "100%",
      height: 45,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    seeMoreText: {
      fontSize: 14,
      color: Colors.lighter_gold,
    },
});
