import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const { interpolate, Extrapolate } = Animated;
const HEADER_HEIGHT = 300;
const HEADER_MIN = 150;
const HEADER_DISTANCE = HEADER_HEIGHT - HEADER_MIN;

export const Filter = ({ image, DATA, scrollY }) => {
    const headerHeight = interpolate(scrollY, {
        inputRange: [0, HEADER_DISTANCE],
        outputRange: [0, -HEADER_MIN / 2],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <>
            <Animated.View style={[styles.filter]}>
                <Text style={{ color: '#999999' }}>{DATA.length} items</Text>

                {/* filter text and (grid and list) icons */}

                { /* <View style={styles.barContainer}>
                    <Animated.View style={styles.iconsContaienr}>
                        <Ionicons
                        name="ios-menu"
                        size={30}
                        color='#444'
                        style={{ paddingHorizontal: 10}}
                        />
                        <View style={{ width: 0.5, backgroundColor: '#999', height: '100%' }} />
                        <Feather
                        name="grid"
                        size={30}
                        color='#999999'
                        style={{ paddingHorizontal: 10}}
                        />
                    </Animated.View>
                </View>
                <TouchableOpacity style={styles.filterText}>
                    <Text style={{ fontSize: 18, textAlign: 'center', }}>Filter</Text>
                </TouchableOpacity> */}
            </Animated.View>
            <Animated.View style={[styles.category,]}>
                <Image
                    source={{ uri: image }}
                    style={{...styles.image }}/>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    filter: {
        width: '100%',
        height: 50,
        borderWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    barContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '50%',
        alignItems: 'center',
        paddingVertical: 8,
    },
    iconsContaienr: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    filterText: {
        borderStartWidth: 0.5,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    category: {
        height: 166,
        width: '100%',
        backgroundColor: null,
        borderRadius: 4,
    },
    image: {
        resizeMode: 'stretch',
        borderRadius: 4,
        height: '100%',
        width: "100%",
    },
})