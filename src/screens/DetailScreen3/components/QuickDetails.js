import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomText from "../../../components/UI/CustomText";
import Colors from '../../../utils/Colors';

export const QuickDetails = () => {
    return (
        <>
            <View style={styles.container}>
                <CustomText style={{ fontWeight: "bold"}}>Quick Details</CustomText>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <CustomText>warranty:</CustomText>
                        <CustomText>warranty</CustomText>
                        <View/>
                    </View>
                    <View style={styles.row}>
                        <CustomText>warranty:</CustomText>
                        <CustomText>warranty</CustomText>
                        <View/>
                    </View>
                    <View style={styles.row}>
                        <CustomText>warranty:</CustomText>
                        <CustomText>warranty</CustomText>
                        <View/>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: '#D8F1FE',
        borderRadius: 5,
        borderWidth: 0.4,
        // borderColor: '#3975F7',
        borderColor: Colors.water.blue,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})