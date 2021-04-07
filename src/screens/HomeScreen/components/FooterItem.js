import React from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Colors from '../../../utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const FooterItem = ({ item, navigation, imageLoading, isImageLoading }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Detail3", {item: item} )}>
            <View style={{ width: '100%', alignItems: 'center'}}>
                <View style={styles.bigCircle}>
                    <View style={styles.smallCircle}>
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                            onLoadStart={isImageLoading(true)}
                            onLoadEnd={isImageLoading(false)}
                        />
                    </View>
                </View>
            </View>
            <Text numberOfLines={1} style={{ color: Colors.water.blue }}>{item.filename}</Text>
            <Text style={{ color: Colors.red, fontSize: 18 }}>{item.price} <Text style={{ fontSize: 10 }}>SAR</Text></Text>
            <Text style={{ color: '#ff8080', fontSize: 9, textDecorationLine: 'line-through' }}>{item.oldPrice}</Text>
        </TouchableOpacity>
    )
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
    bigCircle: {
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        
        width: 100,
        height: 100,
        borderWidth: 0.25,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.water.blue,
        backgroundColor: Colors.water.white
    },
    smallCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderWidth: 0.25,
        borderRadius: 50 / 2,
        borderColor: Colors.water.light_blue
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
    }
})