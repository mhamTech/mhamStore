import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import Messages from "../../../messages/user";
import OrderItem from "./OrderItem";
//PropTypes check
import PropTypes from "prop-types";
import { t } from "i18n-js";

export class OrderBody extends React.PureComponent {
  render() {
    const { navigation, user, orders, loadOrders, isRefreshing } = this.props;
    return (
      <View style={styles.footer}>
        {Object.keys(user).length === 0 ? (
          <View style={styles.center}>
            <CustomText style={{ color: Colors.water.blue }}>{Messages["user.login.require"]}</CustomText>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <View style={styles.button}>
              <CustomText style={{ fontSize: 16, color: "#fff" }}>
                Log in
                </CustomText>
              </View>
              </TouchableOpacity>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.center}>
            <CustomText style={{ fontSize: 16, color: Colors.water.blue }}>
              You have no orders!
            </CustomText>
          </View>
        ) : (
          <FlatList
            data={orders}
            onRefresh={loadOrders}
            refreshing={isRefreshing}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        )}
      </View>
    );
  }
}

OrderBody.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  loadOrders: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    marginVertical: 10,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    borderWidth: 1,
    paddingHorizontal: 155,
    paddingVertical: 15,
    backgroundColor: Colors.water.blue,
    borderRadius: 5,
    borderColor: Colors.water.white,
    marginTop: 10,
  },
});
