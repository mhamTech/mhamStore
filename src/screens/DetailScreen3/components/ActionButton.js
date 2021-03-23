import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
//Animatable
import * as Animatable from "react-native-animatable";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { addToCart, removeFavorite, addFavorite } from "../../../reducers";
import Messages from "../../../messages/user";
import Colors from "../../../utils/Colors";

//PropTypes check
import PropTypes from "prop-types";

export const ActionButton = ({
  user,
  item,
  setShowSnackbar,
  setModalVisible,
  setMessage,
}) => {

  const dispatch = useDispatch();
  const cartLoading = useSelector((state) => state.cart.isLoading);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const addToCartAct = async () => {
    if (Object.keys(user).length === 0) {
      setMessage(Messages['user.login.require']);
      setShowSnackbar(true);
    } else {
      try {
        await dispatch(addToCart(item, user.token));
        setModalVisible(true);
      } catch (err) {
        throw err;
      }
    }
  };
  return (
    <Animatable.View
      delay={1500}
      animation="fadeInUp"
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <CustomText style={{fontSize: 10, marginHorizontal: 12}}>SHIPS from Saudi Arabia</CustomText>
        <CustomText style={{fontSize: 10, marginHorizontal: 12}}>Sold by <CustomText style={{ fontWeight: 'bold', color: Colors.gray }}>Mham</CustomText> </CustomText>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.addCart}
            onPress={addToCartAct}>
            {cartLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={styles.actionText}>Order this product</CustomText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

ActionButton.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setShowSnackbar: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.3,
    borderRightWidth: 0.3,
    borderLeftWidth: 0.3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    height: 50,
    backgroundColor: Colors.blue,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addCart: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 50,
  },
  actionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
});