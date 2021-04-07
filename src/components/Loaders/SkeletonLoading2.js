import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import { placeholder } from 'i18n-js';

const { height, width } = Dimensions.get('window');

const Gradient = () => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      style={{
        flex: 1,
        width: 120,
      }}
    />
  );
};
const Skeleton2 = () => {
  return (
    <PlaceholderContainer
      style={styles.container}
      animatedComponent={<Gradient />}
      duration={1000}
      replace={true}
    >
      <View style={styles.banner}>
        <Placeholder
          style={{
            ...styles.placeholder,
            width: '100%',
            height: 130,
          }}
        />
      </View>
      <Placeholder style={{
          ...styles.placeholder,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 2,
          height: 30
        }}
      />
      <Placeholder style={{
          ...styles.placeholder,
          width: 60,
          height: 20,
          margin: 10,
          marginBottom: -20,
        }}
      />
      {/* slides recently */}
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.slide}>
          <Placeholder
            style={{
                ...styles.placeholder,
                width: 100,
                height: 100,
                borderRadius: 50
            }}
          />
        </View>
        <View style={styles.slide}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          />
        </View>
        <View style={styles.slide}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          />
        </View>
        <View style={styles.slide}>
        <Placeholder
          style={{
              ...styles.placeholder,
              width: 100,
              height: 100,
              borderRadius: 50
          }}
        />
        </View>
        <View style={styles.slide}>
          <Placeholder
            style={{
                ...styles.placeholder,
                width: 100,
              height: 100,
                borderRadius: 50
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              // width: '100%',
              height: 150,
            }}
          />
        </View>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '100%',
              height: 150,
            }}
          />
        </View>
      </View>
    </PlaceholderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    width,
    backgroundColor: '#fff',
    height,
    marginTop: 80,
  },
  placeholder: {
    backgroundColor: '#eeeeee',
    borderRadius: 5,
  },
  banner: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slide: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Skeleton2;
