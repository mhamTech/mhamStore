import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CustomText from "../../../components/UI/CustomText";

export const Hours = () => {
    return (
        <>
            <View style={styles.locationContainer}>
                <CustomText style={styles.address}>Hours Open</CustomText>
                <CustomText style={styles.addressDetails}>9:00AM - 5:00PM</CustomText>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    locationContainer: {
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