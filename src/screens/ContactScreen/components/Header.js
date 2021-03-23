import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <MaterialCommunityIcons name='menu' size={25} color={Colors.water.blue} />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.title}>contact us</CustomText>
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    // top: height < 668 ? 30 : 50,
    left: 15,
    zIndex: 10,
  },
  header: {
    alignItems: "flex-start",
    height: 70,
    // backgroundColor: Colors.black,
    justifyContent: "center",
    flexDirection: 'row',
    marginTop: 35,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
    color: Colors.water.blue
  },
  image: {
    marginTop: 15,
    height: 150,
    width:150,
    resizeMode: "contain",
  },
});
