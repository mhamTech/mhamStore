import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
//redux
import { useSelector } from "react-redux";
//Color
import Colors from "../../utils/Colors";
//Component
import { ProductBody } from "./components";

export const ProductScreen = (props) => {
  const products = useSelector((state) => state.store.products);
  const [productsFilter, setproductsFilter] = useState(products);
  const searchFilterFunction = (text) => {
    // console.log('text', text)
    // console.log('products', products)
    const data = products.filter((product) =>
      // console.log('product', product.filename.toLowerCase())
      // console.log(('Xiaomi_mi_10t').toLowerCase().includes('xia'));
      product.filename.toLowerCase().includes(text.toLowerCase())
    );
    console.log('data', data);
    setproductsFilter(data);
  };
  return (
    <View style={styles.container}>
      <ProductBody
        navigation={props.navigation}
        productsFilter={productsFilter}
        searchFilterFunction={searchFilterFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
