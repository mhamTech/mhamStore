import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../utils/Colors";

export const ListHeader = ({ item }) => {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <LinearGradient
          // gradient border
          colors={Colors.water2}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{ marginHorizontal: 20, borderRadius: 5, padding: 2, marginTop: 5 }}>
          <View style={styles.category}>
            <Image
              source={{ uri: item.image }}
              style={{...styles.image }}/>
          </View>
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        borderRadius: 4,
    },
    category: {
        borderWidth: 0.3,
        borderColor: '#737373',
        height: 166,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 4,
    
        // shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 4,
        height: '100%',
        width: "100%",
    },
    title: {
        fontSize: 18,
        color: Colors.water.blue,
        fontWeight: "500",
        width: '100%',
        paddingHorizontal: 8,
        textAlign: 'center'
    },
});