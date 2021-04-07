import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../../../utils/Colors';
// components
import { FooterItem } from "./FooterItem";
import { LinearGradient } from 'expo-linear-gradient';

export const FlatListFooterComponent = ({ imageLoading, isImageLoading, products, navigation }) => {
    return (
        <View style={styles.footerContainer}>
            <FlatList
                keyExtractor={(item, index) => '_' + index}
                numColumns={2}
                ListHeaderComponent={<Header
                    imageLoading={imageLoading}
                    isImageLoading={isImageLoading}
                    products={products}
                    navigation={navigation}
                />}
                ListFooterComponent={<Footer
                    products={products}
                    navigation={navigation}
                />}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    footerContainer: {
        marginBottom: 10
    },
    headerStyle: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        //shadow
        elevation: 8,
    },
    footerStyle: {
        marginHorizontal: 10,
        borderRadius: 8,
        //shadow
        elevation: 8,
    },
    seeAllText: {
        color: Colors.water.blue,
        paddingHorizontal: 10,
        fontSize: 15,
    },
    shadowIOS: {
        shadowColor: "#000",
        shadowOffset: {
        width: 7,
        height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        elevation: 8,
    },
    item: {
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 7, height: 7
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        marginHorizontal: 5,
        marginTop: 10
    },
})

// Header component
const Header = ({ products, navigation, imageLoading, isImageLoading }) => {
    return(
        <View style={styles.shadowIOS}>
        <LinearGradient
            colors={['#d5dfe3', '#e0e8eb', '#f0f3f5', '#ffffff']}
            style={styles.headerStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Category", {screen: "Categories"})} style={{ paddingTop: 4, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 3 }}>
                    <Image source={require('../../../components/IconAnimation/new.gif')} style={{ borderRadius: 35 / 2, width: 35, height: 35 }} />
                    <Text style={styles.seeAllText}>Recently Added</Text>
                </View>
                <Text style={{...styles.seeAllText, fontSize: 12}}>See all </Text>
            </TouchableOpacity>
            <FlatList
                keyExtractor={(item, index) => '*' + index}
                data={products.slice(0, 6)}
                horizontal={false}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ width: '50%' }}>
                            <FooterItem
                                imageLoading={imageLoading}
                                isImageLoading={isImageLoading}
                                navigation={navigation}
                                item={item} />
                        </View>
                    );
                }}
            />
        </LinearGradient>
        </View>
    )
}

// Footer component
// added here cuz will be conflict names
const Footer = ({ products, navigation }) => {
    return (
        <View style={styles.shadowIOS}>
            <LinearGradient
                colors={['#d5dfe3', '#e0e8eb', '#f0f3f5', '#ffffff']}
                style={styles.footerStyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <FlatList
                    keyExtractor={(item, index) => '#' + index}
                    data={products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <Item key={index} item={item} navigation={navigation} />}
                />
            </LinearGradient>
        </View>
    );
};

const Item = ({ item, navigation }) => {
    return (
        <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Detail3", {item: item} )}>
                <Image source={{uri: item.url}} style={{ borderRadius: 10, width: 200, height: 200 }} />
                <Text numberOfLines={0.5} style={{ marginTop: 5, color: Colors.water.blue, width: 200 }}>{item.filename}</Text>
                <Text style={{ color: Colors.water.blue }}>{item.price}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};