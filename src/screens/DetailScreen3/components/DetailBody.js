import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
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

export const DetailBody = ({ item, color }) => {
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
        <QuickDetails />
        <View style={{ width: '100%', justifyContent: 'center'}}>
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
            style={{ width: '100%', height: 200, borderRadius: 2, borderRadius: 4, backgroundColor: '#000' }}
          />
      </View>

        <CustomText style={{ fontWeight: "bold", marginTop: 20, }}>description</CustomText>
        <CustomText style={{ color: color }} selectable={true}>{item.description}</CustomText>

      </Animatable.View>
    </View>
  );
};

DetailBody.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 2,
  },
  footer_header: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    width: '50%',
  },
  title: {
    fontSize: 17,
    color: Colors.text,
  },
  detail: {
    fontSize: 15,
  },
  price: {
    color: "#fff",
  },
  description: {
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});
