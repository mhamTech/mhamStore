import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { QuickDetails } from './QuickDetails';
//Animatable
import * as Animatable from "react-native-animatable";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
//number format
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
// import { RadioButtons } from 'react-native-radio-buttons'
import { Video } from 'expo-av';

const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item }) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  const _handleVideoRef = component => {
    const playbackObject = component;
    console.log('playbackObject', playbackObject)
  }

  return (
    <View style={[styles.footer]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={2000}
        style={styles.footer_header}>
        <CustomText selectable={true} style={{ ...styles.title }}>{item.filename}</CustomText>
        <NumberFormat style={{ color: "#000", fontSize: 13, backgroundColor: null }}price={item.price}/>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={1000}
        style={styles.description}
      >
        
        <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginBottom: 20, borderColor: '#eee' }} />
        <QuickDetails />
        <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginTop: 20, marginBottom: 0, borderColor: '#eee' }} />
        <View style={{ width: '100%', justifyContent: 'center', marginTop: 10}}>
          <View style={{ width: '100%' }}>
            <CustomText style={{ fontWeight: 'bold' }}>Video</CustomText>
          </View>
          <Video
            // ref={_handleVideoRef}
            source={{ uri: 'http://video01.alibaba.com/vod-icbu/a9b5b21ee64d2b47/GVbhvb6Gti20kS7r4sZ/oPbw4On7NpeUzFM7ACZ_252320545213_sd_hq.mp4' }}
            rate={1.0}
            volume={10.0}
            isMuted={true}
            useNativeControls
            resizeMode="cover"
            shouldPlay={autoPlay}
            resizeMode='contain'
            style={{ width: '100%', height: 200, borderRadius: 2, borderRadius: 4, backgroundColor: '#000', marginTop: 2 }}
          />
      </View>

        <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginTop: 20, borderColor: '#eee' }} />
        <CustomText style={{ fontWeight: "bold", marginTop: 20, }}>description</CustomText>
        <CustomText style={{ color: Colors.black }} selectable={true}>{item.description}</CustomText>

      </Animatable.View>
    </View>
  );
};

DetailBody.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    marginTop: 2,
    borderRadius: 20,
  },
  footer_header: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: '50%',
  },
  title: {
    fontSize: 17,
    color: '#3975F7',
    width: '100%',
  },
  detail: {
    fontSize: 15,
  },
  price: {
    color: "#fff",
  },
  description: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  image: {
    position: "absolute",
    top: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 200,
    resizeMode: "contain",
  },
});
