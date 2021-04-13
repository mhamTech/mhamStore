import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
// navigate fun
import { navigate } from '../../../navigation/RootNavigation';
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";
//PropTypes check
import PropTypes from "prop-types";

export const CategorySection2 = ({ data, name, image }) => {
  const DATA = data.filter((item) => name.toLowerCase().includes(item.type));

  return (
    <TouchableOpacity
      onPress={() => {navigate("Category", {
        screen: "CategoryScreen",
        params: {
          categoryName: name,
          DATA: DATA,
          image: image
        }
      })} }
      >
      <View style={styles.container}>
        <LinearGradient
          // gradient border
          colors={Colors.water2}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{ marginHorizontal: 20, borderRadius: 5, padding: 2, marginTop: 5 }}
        >
          <View style={styles.category}>
            <Image
              source={{ uri: image }}
              style={{...styles.image }}/>
          </View>
        </LinearGradient>
        <CustomText style={styles.title}>{name}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

CategorySection2.propTypes = {
  data: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
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
    color: Colors.water.blue,
    fontWeight: "500",
    width: '100%',
    paddingHorizontal: 8,
    textAlign: 'center'
  },
});
