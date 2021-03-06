import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "../../../components/UI/CustomText";
//PropTypes check
import PropTypes from "prop-types";

//redux
import { useDispatch, useSelector } from "react-redux";

export const CartItemNoAuth = ({ item, onRemove, onAdd, onDelete }) => {
  //, onAdd, onDes, onRemove
  const dispatch = useDispatch();

  
  // const sum = +item.productPrice * +item.quantity;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: "100%",
            height: 90,
            resizeMode: "contain",
            borderRadius: 5,
          }}
          source={{ uri: item.productImg }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={styles.title}>{item.productTitle}</CustomText>
          <View>
            <TouchableOpacity onPress={onDelete}>
              <MaterialCommunityIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <CustomText style={{ color: Colors.grey, fontSize: 12 }}>
          Provided by Mham Store
        </CustomText>
        <NumberFormat price={sum.toString()} />
        <View style={styles.box}>
          <TouchableOpacity onPress={onRemove} style={styles.boxMin}>
            <MaterialCommunityIcons name="minus" size={16} />
          </TouchableOpacity>
          <View>
            <CustomText style={styles.boxText}>{item.quantity}</CustomText>
          </View>
          <TouchableOpacity onPress={onAdd} style={styles.boxMin}>
            <MaterialCommunityIcons name="plus" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

CartItemNoAuth.propTypes = {
  item: PropTypes.object.isRequired,
  //   onAdd: PropTypes.func.isRequired,
  //   onRemove: PropTypes.func.isRequired,
  //   onDes: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "35%",
    height: "100%",
    alignItems: "center",
  },
  right: {
    width: "65%",
    paddingLeft: 15,
    height: 90,
    // overflow: "hidden",
  },
  title: {
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.light_grey,
    width: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  boxMin: {
    width: "30%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
  },
});
