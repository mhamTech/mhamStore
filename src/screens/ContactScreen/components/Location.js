import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CustomText from "../../../components/UI/CustomText";

export const Location = () => {
    return (
        <>
            <View style={styles.locationContainer}>
                <CustomText style={styles.address}>Address</CustomText>
                <CustomText style={styles.addressDetails}>Riyadh, Saudi Arabia</CustomText>
                <CustomText style={styles.addressDetails}>Jarir, </CustomText>
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