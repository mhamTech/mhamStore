import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Item
import ItemList from "../../PreOrderScreen/components/PreOrderItem";
//Number format
import NumberFormat from "../../../components/UI/NumberFormat";
//Moment
import moment from "moment";
import "moment/min/locales";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";
import Steps from "../../../components/UI/Steps";

// moment.locale("vi");

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const status = () => {
    switch (order.status) {
      case "waiting":
        return 0;
      case "confirmed":
        return 1;
      case "delivery":
        return 2;
      default:
        return 3;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Single code: </CustomText>
          <CustomText style={styles.detail}>
            CT-{order._id.substr(order._id.length - 10)}
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Date of ordering: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.updatedAt).format("Do, MMMM  YYYY, hh:mm a ")}
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
          <View style={styles.detailButton}>
            <CustomText style={{ fontSize: 15, color: "#fff" }}>
              {showDetails ? "Hide Order Details" : "Show Order Details"}
            </CustomText>
          </View>
        </TouchableOpacity>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Recipient's name: </CustomText>
              <CustomText style={styles.detail}>{order.name}</CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Address: </CustomText>
              <CustomText style={styles.detail}>{order.address}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>phone number: </CustomText>
              <CustomText style={styles.detail}>{order.phone}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Payment methods: </CustomText>
              <CustomText style={styles.detail}>
                {order.paymentMethod}
              </CustomText>
            </View>
            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={styles.text}>Products ordered:</CustomText>
            <FlatList
              data={order.items}
              keyExtractor={({item}) => item._id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            />
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <CustomText style={styles.text}>Total Amount:</CustomText>
              <NumberFormat
                price={order.totalAmount.toString()}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: Colors.water.light_blue,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  text: {
    color: Colors.water.blue,
  },
  detailButton: {
    backgroundColor: Colors.water.blue,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detail: {
    color: Colors.water.blue,
    textDecorationLine: 'underline',
    marginHorizontal: 10
  },
  steps: {
    width: "100%",
    height: 100,
  },
});

export default OrderItem;
