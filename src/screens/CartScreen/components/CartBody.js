import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
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
import { CartItemNoAuth } from "./CartItemNoAuth";
import * as cartActions from "../../../reducerTest/CartNoAuthAction";

import Messages from "../../../messages/user";
//PropTypes check
import PropTypes from "prop-types";

export const CartBody = ({
  navigation,
  user,
  carts,
  loadCarts,
  isRefreshing,
  Cartlength,
}) => {
  const dispatch = useDispatch();
  const onRemove = (itemId) => {
    Alert.alert("Are you sure you remove products from the cart?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          dispatch(removeFromCart(carts._id, itemId));
        },
      },
    ]);
  };

  //test
  const test = useSelector((state) => state.CartNoAuthReducer.items);
  const cartItemTest = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.CartNoAuthReducer.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.CartNoAuthReducer.items[key].productTitle,
        productPrice: state.CartNoAuthReducer.items[key].productPrice,
        quantity: state.CartNoAuthReducer.items[key].quantity,
        productImg: state.CartNoAuthReducer.items[key].image,
      });
      // console.log(state.CartNoAuthReducer.items[key].img)
    }
    return transformedCartItem;
  });
  // React.useEffect(() => {
  //   // console.log(cartItemTest);
  //   // console.log(test);
  // });

  // console.log("CartBody.js cartLength", Cartlength);

  //end of test
  return (
    <View style={styles.footer}>
      {/* {Object.keys(user).length === 0 ? ( */}

      {Cartlength === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            No products in the shopping cart
          </CustomText>
        </View>
      ) : Object.keys(user).length === 0 ? (
        <View style={{ marginBottom: 0 }}>
          <FlatList
            data={cartItemTest}
            keyExtractor={(item) => item.productId}
            renderItem={({ item }) => (
              <CartItemNoAuth
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(item.productId));
                  // console.log(item.productId);
                }}
                onDelete={() => {
                  // console.log('hi')
                  dispatch(cartActions.deleteFromCart(item.productId));
                }}
                onAdd={() => {
                  dispatch(cartActions.addToCart(item));
                }}
                item={item}
              />
            )}
          />
          <View style={styles.center}>
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <CustomText style={{ color: "#fff" }}>Order now</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={cartItemTest}
            keyExtractor={(item) => item.productId}
            renderItem={({ item }) => (
              <CartItemNoAuth
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(item.productId));
                  // console.log(item.productId);
                }}
                onDelete={() => {
                  // console.log('hi')
                  dispatch(cartActions.deleteFromCart(item.productId));
                }}
                onAdd={() => {
                  dispatch(cartActions.addToCart(item));
                }}
                item={item}
              />
            )}
          />
        </View>
      )}
      {/* ) :
      //  carts.items.length === 0 ? (
      //   <View style={styles.center}>
      //     <CustomText style={{ fontSize: 16 }}>
      //       No products in the shopping cart
      //     </CustomText>
      //   </View>
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
                  onRemove={() => {
                    // onRemove(item.item._id);
                    dispatch(removeFromCart(carts._id, item.item._id));
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
        </View> */}
      {/* )} */}
    </View>
  );
};

CartBody.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.object,
  loadCarts: PropTypes.func,
  isRefreshing: PropTypes.bool,
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_gold,
    borderRadius: 5,
    borderColor: Colors.lighter_gold,
    marginTop: 10,
  },
  center: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

// old code for
// <View style={styles.center}>
//   <CustomText>{Messages["user.login.require"]}</CustomText>
//   <View style={styles.nextButton}>
//     <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//       <CustomText style={{ color: "#fff" }}>Continue</CustomText>
//     </TouchableOpacity>
//   </View>
// </View>
