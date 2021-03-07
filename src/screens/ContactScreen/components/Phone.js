import React from 'react';
import {
    StyleSheet,
    View,
    Text,

} from "react-native";
import CustomText from "../../../components/UI/CustomText";

export const Phone = () => {
    return (
        <>
            <View style={styles.locationContainer}>
                <CustomText style={styles.address}>Phone</CustomText>
                <CustomText style={styles.addressDetails}>05555555555</CustomText>
                <CustomText style={styles.addressDetails}>0114567890</CustomText>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    locationContainer: {
        borderBottomWidth: 1,

        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        height: 120,
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addressDetails: {
        fontSize: 15,
        marginTop: 5,
    },
})