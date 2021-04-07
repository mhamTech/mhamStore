import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../utils/Colors";
// components
import { ListHeader } from './ListHeader';
import { ListItem } from './ListItem';

export const Item = ({ item, products, navigation }) => {
    const data = products.filter((product) => item.name.toLowerCase().includes(product.type));

    return (
        <LinearGradient
            colors={['#d5dfe3', '#e0e8eb', '#f0f3f5', '#ffffff']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <FlatList
                keyExtractor={(item, index) => '*' + index}
                ListHeaderComponent={<ListHeader item={item} />}
                data={data}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ width: '50%' }}>
                        <ListItem navigation={navigation} key={index} item={item} />
                    </View>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderRadius: 8,
        marginTop: 5,
        //shadow
        elevation: 8,
        paddingBottom: 5,
        marginBottom: 10,
    },
    headerContainer: {
        borderRadius: 4,
    },
    category: {
        borderWidth: 0.3,
        borderColor: '#737373',
        height: 166,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 4,
    
        // shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 4,
        height: '100%',
        width: "100%",
    },
    title: {
        fontSize: 18,
        color: Colors.water.blue,
        fontWeight: "500",
        width: '100%',
        paddingHorizontal: 8,
        textAlign: 'center'
    },
});