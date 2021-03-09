import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomText from "../../../components/UI/CustomText";

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
        // padding: 10,
        height: 120
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