import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, StyleSheet, Button, Animated, Image, Dimensions, Text, TouchableOpacity } from "react-native";
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
import { Audio, Video } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item }) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  // youtube
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  // const [ready, isReady] = useState(false);
  // const [status, setStatus] = useState('');
  // const [quality, setQuality] = useState('');
  // const [error, setError] = useState('');
  
  const _handleVideoRef = component => {
    const playbackObject = component;
    console.log('playbackObject', playbackObject)
  }

  if(item.youtube_video) {
    var videoURL = item.youtube_video.split('v=')[1];
    var ampersandPosition = videoURL.indexOf('&');
    if(ampersandPosition != -1) videoURL = videoURL.substring(0, ampersandPosition);
  }

  return (
    <View style={[styles.footer]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={2000}
        style={styles.footer_header}>
        <CustomText selectable={true} style={{ ...styles.title, }}>{item.filename}</CustomText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '30%', alignItems: 'center' }}>
          <NumberFormat style={{ color: "#000", fontSize: 13}}price={item.price}/>
          <Text style={{ color: "#000", fontSize: 10, textDecorationLine: 'line-through' }}price={item.oldPrice}>{item.oldPrice}</Text>
        </View>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={1000}
        style={styles.description}
      >
        
        <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginBottom: 20, borderColor: '#eee' }} />

        {item.quickDetails.length > 0 &&
          <>
            <QuickDetails details={item.quickDetails} />
            <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginTop: 20, marginBottom: 0, borderColor: '#eee' }} />
          </>
        }

        <View style={{ width: '100%', justifyContent: 'center', marginTop: 10}}>
          {item.youtube_video &&
            <>
              <View style={{ width: '100%' }}>
                <CustomText style={{ fontWeight: 'bold' }}>Video</CustomText>
              </View>
              <YoutubePlayer
                height={200}
                play={playing}
                videoId={videoURL}
                onChangeState={onStateChange}
              />
              <View style={{ marginHorizontal: 5, borderWidth: 0.5, marginTop: 20, borderColor: '#eee' }} />
            </>
          }          
      </View>
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
    width,
  },
  title: {
    fontSize: 17,
    color: '#3975F7',
    width: '100%',
    // borderWidth: 1,
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
  video: {
    width: '100%',
    height: 200,
    borderRadius: 2,
    borderRadius: 4,
    backgroundColor: '#000',
    marginTop: 2
  }
});
