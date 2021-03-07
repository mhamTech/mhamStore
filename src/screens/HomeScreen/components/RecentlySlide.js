import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
const { width } = Dimensions.get("window");

const RecentlySlide = ({ name, bg, image, price }) => {
  return (
    <View style={{...styles.container}}>
      <View style={styles.background}>
          {/* <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} /> */}
      </View>
    </View>

    // <TouchableOpacity style={{ borderWidth: 1, height: 222, width: 142}} onPress={() => ToastAndroid.show('clicked', ToastAndroid.SHORT)}>
    // <View style={styles.container}>
    //     <View style={{...styles.item, backgroundColor: bg}}>
    //         {/* <Image source={{uri: image}} style={{width: '100%', height: '100%', marginBottom: 8, borderRadius: 4}} /> */}
    //     </View>
    //     <CustomText style={styles.text}>{name}</CustomText>
    //     <CustomText style={{...styles.text, fontWeight: "bold", fontSize: 10}}>{price} SAR</CustomText>
    // </View>
    // </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 220,
    borderRadius: 5,
    padding: 5,
    marginStart: 10,
    marginEnd: 10,
  },
  background: {
    borderWidth: 0.3,
    borderColor: '#737373',

    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  // container: {
  //   // height: 230,
  //   // width: 150,
  //   marginHorizontal: 10,
  //   paddingVertical: 8,
  //   paddingHorizontal: 8,
  //   marginBottom: 20,
  // },
  // item: {
  //   height: 220,
  //   width: 140,
  //   borderRadius: 4,
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 14,
  //   color: Colors.light_gold,
  //   fontWeight: "500",
  //   marginHorizontal: 4,
  // }
});

export default RecentlySlide;
