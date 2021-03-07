import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";
//icon
import { AntDesign } from "@expo/vector-icons";
//Text
import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";

const HorizontalItem = ({ item, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail3", { item: item.item })}
            style={{ width: "40%", borderRadius: 5, borderWidth: 0, backgroundColor: '#f2f2f2', marginHorizontal: 15, paddingVertical: 5, }}
          >
            <Image
              style={{
                height: 90,
                width: "100%",
                resizeMode: "contain",
              }}
              source={{ uri: item.item.thumb }}
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={Colors.grey}
                style={{ position: "absolute", left: 0, right: 0, top: 40 }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.info}>
            <CustomText style={styles.title}>{item.item.filename}</CustomText>
            <CustomText style={styles.subText}></CustomText>
            <View style={styles.rateContainer}>
              <View style={styles.rate}>
                <AntDesign name="star" color="#fed922" size={15} />
                <CustomText style={styles.score}>4.5</CustomText>
              </View>
              <NumberFormat price={item.item.price} />
            </View>
          </View>
      </View>
    </View>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 15,
    flex: 1,
  },
  itemContainer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 5,
    // borderRadius: 20,
    alignItems: "center",
    // marginHorizontal: 25,
    
    //shadows
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 7,
    //   height: 7,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 8,

    // elevation: 8,
  },
  info: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
    width: "60%",
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,
    color: Colors.grey,
    marginVertical: 10,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
});

export default HorizontalItem;
