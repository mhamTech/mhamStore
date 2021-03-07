import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
const { width } = Dimensions.get("window");

const Slide = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          resizeMode: "cover",
          width,
          height: 150,
        }}
        // source={imageUrl}
        source={{ uri: imageUrl }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width,
    height: 150,
    alignItems: "center",
    backgroundColor: '#fff',
    marginTop: 50,
  },
});

export default Slide;
