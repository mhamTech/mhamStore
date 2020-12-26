import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";

//Translation

//PropTypes check
import PropTypes from "prop-types";

export const CategorySection = ({ data, name, bg, navigation }) => {
  // const { t, i18n } = useTranslation();

  const books = data.filter((book) => book.type === "book"); //filter items of type X
  // console.log(rings)
  const bags = data.filter((bag) => bag.type === "bag"); //filter items of type y

  const pens = data.filter((pen) => pen.type === "pen"); //filter items of type z
  function getItems() {
    const items = name === "Books" ? books : name === "Bags" ? bags : pens;
    return items;
  }
  return (
    <View style={[styles.category]}>
      <Image style={styles.background} source={bg} blurRadius={10} />
      <View style={styles.titleHeader}>
        <CustomText style={styles.title}>{name}</CustomText>

      </View>
      <View style={styles.productList}>
        <FlatList
          data={getItems()}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.list}
          renderItem={({ item }) => {
            return (
              <ProductItem key={item._id} item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Product")}
        style={{ marginHorizontal: 10 }}
      >
        <BlurView tint="light" intensity={100} style={styles.seeMore}>
          <CustomText style={styles.seeMoreText}>See More</CustomText>
        </BlurView>
      </TouchableOpacity>
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
    resizeMode: "stretch",
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