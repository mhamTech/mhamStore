import React from 'react';
import {
    FlatList,
    Text,
    View
} from 'react-native';
// components
import { Item } from './Item';

export const Body = ({ categories, products, navigation }) => {
    return (
        <>
            <FlatList
                keyExtractor={(item, index) => '*' + index}
                data={categories.categories}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <Item
                        navigation={navigation}
                        item={item}
                        products={products}
                    />
                }
            />
        </>
    )
};