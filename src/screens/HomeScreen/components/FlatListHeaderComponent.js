import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { CategorySection2 } from "./CategorySection2";

import { Carousel } from './Carousel';
import { RecentlySlide } from './RecentlySlide';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");

export const FlatListHeaderComponent = ({ recently, slides, navigation, clearRecently, categories, products }) => {

    return (
    <>
      <FlatList
        keyExtractor={(item, index) => '_' + index}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.flatListSstyle}
        ListHeaderComponent={
          <>
            <Carousel products={products} top={50} />
            <LinearGradient
              // gradient border
              colors={Colors.water2}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={styles.blackBox}>
              <CustomText style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>SHOP THE MOST SMART ITEMS WITH US</CustomText>
            </LinearGradient>
          </>
        }
        ListFooterComponent={
          <View style={styles.shadowIOS}>
            <LinearGradient
              colors={['#d5dfe3', '#e0e8eb', '#f0f3f5', '#ffffff']}
              style={styles.footerStyle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => navigation.navigate("Category", {screen: "Categories"})}>
                <Text style={{ color: Colors.water.blue, marginHorizontal: 10, marginTop: 10, fontSize: 15 }}>Categories</Text>
                <Text style={{ color: Colors.water.blue, marginHorizontal: 10, marginTop: 10, fontSize: 12 }}>See all</Text>
              </TouchableOpacity>
              {categories.map((item, index) => {
                if(item.show === '0') return <View/>
                else return (
                  <CategorySection2
                    key={index}
                    data={products}
                    name={item.name}
                    navigation={navigation}
                    image={item.image}
                  />  
                )
              })}
            </LinearGradient>
          </View>
        }
      />
      {recently && slides.recently &&
        <>
          <View style={{ borderTopWidth: 0.3, flexDirection: 'row', borderColor: Colors.water.white, justifyContent: 'space-between' }}>
            <CustomText style={{...styles.catText }}>Recently Visited</CustomText>
            <TouchableOpacity onPress={() => clearRecently()}>
              <CustomText style={{...styles.catText, fontSize: 10 }}>clear</CustomText>
            </TouchableOpacity>
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
  flatListSstyle: {},
  blackBox: {
      backgroundColor: 'black',
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 5,
      padding: 5,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      //shadows
      shadowColor: "#000",
      shadowOffset: { width: 7, height: 7 },
      shadowOpacity: 0.30,
      shadowRadius: 8,
      elevation: 8,
  },
  catText: {
      fontSize: 13,
      marginHorizontal: 14,
      marginTop: 10,
      color: Colors.water.blue,
      fontWeight: "500",
  },
  slidesContainer: {
      height: 90,
      borderBottomWidth: 0.3,
      borderColor: Colors.water.white
  },
  footerStyle: {
    marginHorizontal: 10,
    borderRadius: 8,
    //shadow
    elevation: 8,
    paddingBottom: 5
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: {
    width: 7,
    height: 7,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 8,
},
});