import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  Text,
} from "react-native";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { removeFromCart, addToCart, decCartQuantity } from "../../../reducers";
//Text
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import { CartItem } from "./CartItem";

import Messages from "../../../messages/user";
//PropTypes check
import PropTypes from "prop-types";
// i18n
import { t } from "i18n-js";
import { ScrollView } from "react-native-gesture-handler";

export const CartBody = ({
  navigation,
  user,
  carts,
  loadCarts,
  isRefreshing,
}) => {
  const dispatch = useDispatch();
  const onRemove = (itemId) => {
    Alert.alert(t("cart.remove"), t("cart.sureMessage"),
      [
        {
          text: t("cart.cancel"),
          style: "cancel",
        },
        {
          text: t("cart.confirm"),
          onPress: async () => await dispatch(removeFromCart(carts._id, itemId))
        },
      ]
    );
  };

  return (
    <View style={styles.footer}>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ color: Colors.water.blue }}>{Messages["user.login.require"]}</CustomText>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <View style={styles.nextButton}>
                <CustomText style={{ color: "#fff", fontSize: 18, }}>{t('profile.login')}</CustomText>
              </View>
            </TouchableOpacity>
        </View>
      ) : (carts.items.length === 0 ? (
        <View style={styles.center}>
        <ScrollView contentContainerStyle={styles.center} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadCarts} />}>
          <CustomText style={{ fontSize: 16 }}>
            {t("cart.noProduct")}
          </CustomText>
        </ScrollView>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts.items}
            onRefresh={loadCarts}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.item._id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  //removeFromCart(carts._id, item.item._id))
                  onRemove={() => {
                    onRemove(item.item._id);
                    // dispatch(removeFromCart(carts._id, item.item._id))
                  }}
                  onAdd={() => {
                    dispatch(addToCart(item.item, user.token));
                  }}
                  onDes={() => {
                    dispatch(decCartQuantity(carts._id, item.item._id));
                  }}
                />
              );
            }}
          />
        </View>
      ))}
    </View>
  );
};

CartBody.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
  loadCarts: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  footer: {
    // flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 155,
    paddingVertical: 15,
    backgroundColor: Colors.water.blue,
    borderRadius: 5,
    borderColor: Colors.water.white,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});