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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../../../utils/Colors';

const { interpolate, Extrapolate } = Animated;
const HEADER_HEIGHT = 300;
const HEADER_MIN = 150;
const HEADER_DISTANCE = HEADER_HEIGHT - HEADER_MIN;

export const Filter = ({ image, DATA, scrollY, grid, setGrid }) => {
    const headerHeight = interpolate(scrollY, {
        inputRange: [0, HEADER_DISTANCE],
        outputRange: [0, -HEADER_MIN / 2],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <>
            <Animated.View style={[styles.filter]}>
                <Text style={{ color: '#999999' }}>{DATA.length} items</Text>
                <View/>

                {/* filter text and (grid and list) icons */}

                <View style={styles.barContainer}>
                    <Animated.View style={styles.iconsContaienr}>
                        <TouchableWithoutFeedback onPress={() => setGrid(false)} style={{ borderRightWidth: 0.5, borderColor: '#8c8c8c' }}>
                            <Feather
                            name="list"
                            size={30}
                            color={!grid ? Colors.water.blue : Colors.water.light_blue}
                            style={{ paddingHorizontal: 10}}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setGrid(true)} style={{ borderLeftWidth: 0.5, borderColor: '#8c8c8c' }}>
                            {/* <View style={{ width: 0.5, backgroundColor: '#999', height: '100%' }} /> */}
                            <Feather
                            name="grid"
                            size={30}
                            color={grid ? Colors.water.blue : Colors.water.light_blue}
                            style={{ paddingHorizontal: 10}}
                            />
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </View>
                {/* <TouchableOpacity style={styles.filterText}>
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
        paddingHorizontal: 10,
        marginVertical: 0,
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
        height: '100%',
        width: "100%",
        marginTop: 1,
    },
})