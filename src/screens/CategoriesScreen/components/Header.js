import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import Colors from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');

export const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color={Colors.water.blue} />
            </TouchableOpacity>
            <Text style={styles.title}>Categories</Text>
            <View/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: 'white',
        width,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        color: Colors.water.blue
    },
})