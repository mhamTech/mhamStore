import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomText from "../../../components/UI/CustomText";
import Colors from '../../../utils/Colors';

export const QuickDetails = ({ details }) => {
    return (
        <>
            <View style={styles.container}>
                <CustomText style={{ fontWeight: "bold", textDecorationLine: 'underline' }}>Quick Details</CustomText>
                <View style={styles.column}>
                    {details.map((element, index) => (
                            <View key={index} style={styles.row}>
                                <CustomText style={{ fontWeight: 'bold' }}>{element.prop}</CustomText>
                                <CustomText style={{ textAlign: 'justify' }}>{element.val}</CustomText>
                            </View>
                        )
                    )}
                </View>
            </View>
        </>
)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D8F1FE',
        borderRadius: 5,
        borderWidth: 0.4,
        borderColor: Colors.water.blue,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
    },
})