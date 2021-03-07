import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

export const CategorySection = ({ data, name, bg, navigation }) => {

  function getItems() {
    let items = [];
    items = data.filter((item) => name.toLowerCase().includes(item.type));
    return items;
  }

  return (
    <View style={styles.category}>
      {/* <ScrollView style={{ height: null, borderWidth: 1}}> */}
      <View style={{...styles.background, backgroundColor: bg }} />
        <View style={styles.titleHeader}>
          <CustomText style={styles.title}>{name}</CustomText>
        </View>
        <View style={styles.productList}>
          <FlatList
            data={getItems()}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.list}
            scrollEnabled
            renderItem={({ item }) => {
              return (
                <ProductItem
                  key={item._id}
                  item={item}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product")}
          style={{ marginHorizontal: 10 }}>
          <BlurView tint="light" intensity={100} style={styles.seeMore}>
            <CustomText style={styles.seeMoreText}>See More</CustomText>
          </BlurView>
        </TouchableOpacity>
      {/* </ScrollView> */}
    </View>
  );
};

CategorySection.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  category: {
    height: 518,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 5,
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    // resizeMode: "stretch",
    borderRadius: 5,
    height: 518,
    width: "100%",
    bottom: 0,
  },
  titleHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems:'flex-start'
  },
  title: {
    fontSize: 18,
    color: Colors.light_gold,
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
