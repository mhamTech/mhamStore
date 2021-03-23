import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";

import { Carousel } from './Carousel';
import { RecentlySlide } from './RecentlySlide';

const { width } = Dimensions.get("window");

export const FlatListHeaderComponent = ({ recently, slides, navigation }) => {

    return (
    <>
      <Carousel />
      <LinearGradient
        // gradient border
        colors={Colors.water2}
        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
        style={styles.blackBox}>
        <CustomText style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>SHOP THE MOST SMART ITEMS WITH US</CustomText>
      </LinearGradient>
      {recently && slides.recently &&
        <>
          <View style={{ borderTopWidth: 0.3, marginHorizontal: 0, borderColor: Colors.water.white }}>
            <CustomText style={{...styles.catText }}>Recently</CustomText>
          </View>
          <FlatList
            keyExtractor={(item, index) => '#' + index}
            horizontal
            snapToInterval={width}
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={1}
            data={slides.recently}
            renderItem={({ item, index }) =>
              <View style={styles.slidesContainer} key={index}>
                <RecentlySlide item={item} navigation={navigation} />
              </View>
            }
          />
        </>
      }
    </>
    )
}

const styles = StyleSheet.create({
    blackBox: {
        backgroundColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        padding: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    
        shadowColor: "#000",
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        elevation: 8,
    
        // borderBottomWidth: 0.5
    },
    catText: {
        fontSize: 13,
        // marginStart: 14,
        // marginEnd: 14,
        marginHorizontal: 14,
        marginTop: 10,
        color: Colors.water.blue,
        fontWeight: "500",
    },
    slidesContainer: {
        height: 120,
        borderBottomWidth: 0.3,
        borderColor: Colors.water.white
    },
})