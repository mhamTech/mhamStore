import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { useSelector } from "react-redux";

// Header
import { Header, Body } from './components'

export const CategoriesScreen = ({ navigation }) => {
  const categories = useSelector((state) => state.category);
  const products = useSelector((state) => state.store.products);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Body categories={categories} products={products} navigation={navigation} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})