import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";

//PropTypes check
import PropTypes from "prop-types";

export const CategorySection2 = ({ data, name, bg, navigation, image }) => {
  const DATA = data.filter((item) => name.toLowerCase().includes(item.type));

  return (
    <TouchableOpacity
      onPress={() => {navigation.navigate("Category", {
        screen: "CategoryScreen",
        params: {
          categoryName: name,
          DATA: DATA,
          image: image
        }
      })} }
      >
      <View style={styles.container}>
        <View style={styles.category}>
          {/* <Image
            source={{ uri: image }}
            style={{...styles.image }}/> */}
        </View>
          <CustomText style={styles.title}>{name}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

CategorySection2.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 5,
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

    // elevation: 8,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 4,
    height: '100%',
    width: "100%",
  },
  title: {
    fontSize: 18,
    color: Colors.light_gold,
    fontWeight: "500",
    width: '100%',
    paddingHorizontal: 8,
    textAlign: 'center'
  },
});
