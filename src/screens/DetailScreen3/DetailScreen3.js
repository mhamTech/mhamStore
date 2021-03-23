import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
//Color
import Colors from '../../utils/Colors';
//Redux
import { useSelector } from 'react-redux';
//Components
import Snackbar from '../../components/Notification/Snackbar';
import {
  Header,
  DetailBody,
  ActionButton,
  ModalComp,
  Comments,
} from './components';
import { API_URL } from '../../utils/Config';

export const DetailScreen3 = (props) => {

  const scrollY = new Animated.Value(0.01);
  const user = useSelector((state) => state.auth.user);
  const { item } = props.route.params;
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // storing the item in recently for the user signed in
    if(Object.keys(user).length !== 0) {
      fetch(`${API_URL}/product/recently`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item._id,
          userId: user.userid
        })
      })
    }
  }, []);

  return (
    <View style={styles.container}>
      {showSnackbar ? (
        <Snackbar checkVisible={showSnackbar} message={message} />
      ) : (
        <View />
      )}
      <Header navigation={props.navigation} scrollY={scrollY} item={item} />

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <DetailBody item={item} />
        <Comments />
      </Animated.ScrollView>
      <ActionButton
        item={item}
        // FavoriteProducts={FavoriteProducts}
        setShowSnackbar={setShowSnackbar}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        user={user}
        navigation={props.navigation}
      />
      <ModalComp
        item={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    height: '100%',
  },
});
