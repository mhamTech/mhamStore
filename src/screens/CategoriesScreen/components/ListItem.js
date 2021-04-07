import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../../utils/Colors';

export const ListItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Detail3", {item: item} )}>
            <View style={{ width: '100%', alignItems: 'center'}}>
                <Image
                    source={{ uri: item.url }}
                    style={{ width: 90, height: 90, borderRadius: 90 / 2 }}
                />
            </View>
            <Text numberOfLines={1} style={{ color: Colors.water.blue }}>{item.filename}</Text>
            <Text style={{ color: Colors.red, fontSize: 18 }}>{item.price} <Text style={{ fontSize: 10 }}>SAR</Text></Text>
            <Text style={{ color: '#ff8080', fontSize: 9, textDecorationLine: 'line-through' }}>{item.oldPrice}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: Colors.water.light_blue,
        paddingVertical: 5,
        paddingHorizontal: 5

    },
})