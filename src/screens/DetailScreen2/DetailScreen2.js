import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
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
import { colorCheck } from '../../utils/Tools';

export const DetailScreen2 = (props) => {
  const scrollY = new Animated.Value(0.01);
  const user = useSelector((state) => state.auth.user);
  const { item } = props.route.params;
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [color, setColor] = useState(Colors.lighter_gold);
  //color
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const FavoriteProducts = useSelector((state) =>
    state.fav.favoriteList.some((product) => product._id === item._id),
  );
  useEffect(() => {
    // const checkColor = async () => {
    //   const getColor = await colorCheck(type);
    //   setColor(getColor);
    // };
    // checkColor();
  }, [item]);

  const color = Colors.light_gold

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', flex: 0.5 }}>
          <Header navigation={props.navigation} scrollY={scrollY} item={item} />
        </View>
        <View style={styles.body}>
          <DetailBody item={item} color={color} />
        </View>

      {/* {showSnackbar ? (
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
        <DetailBody item={item} color={color} />
        <Comments />
      </Animated.ScrollView>
      <ActionButton
        item={item}
        FavoriteProducts={FavoriteProducts}
        setShowSnackbar={setShowSnackbar}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        user={user}
        color={color}
      />
      <ModalComp
        item={item}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },

  container: {
    flex: 1,
    // borderTopWidth: 4,
    // borderLeftWidth: 4,
    // borderRightWidth: 4,
    // borderColor: 'white',
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    // paddingTop: 30,
    backgroundColor: '#C7973A',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'ios' ? 20 : 5,
  },
  body: {
    flexDirection: 'row',
    flex: 0.5,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 4,
    paddingEnd: 4
  },
});
