import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CustomText from "../../../components/UI/CustomText";
import Colors from '../../../utils/Colors';

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
        borderColor: Colors.water.light_blue,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        height: 120,
        color: Colors.water.blue
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.water.blue
    },
    addressDetails: {
        fontSize: 15,
        marginTop: 5,
        color: Colors.water.blue
    },
})