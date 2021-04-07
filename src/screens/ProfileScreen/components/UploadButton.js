import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../../utils/Colors";
import { Button } from "react-native-paper";
//PropTypes check
import PropTypes from "prop-types";

const UploadButton = ({
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}) => {
  return (
    <View style={styles.button}>
      <Button
        mode='contained'
        onPress={UploadProfile}
        disabled={uploadButton}
        style={{
          height: 40,
          width: '50%',
          justifyContent: "center",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.blue,
        }}>
        <Text style={{ fontSize: 10, color: '#fff' }}>Update Profile Picture</Text>
      </Button>
      {!uploadButton ? (
        <Button
          mode='contained'
          onPress={() => {
            setUploadButton(true), setImageUri("");
          }}
          disabled={uploadButton}
          style={{
            marginTop: 5,
            height: 40,
            width: '50%',
            justifyContent: "center",
            backgroundColor: Colors.blue,
          }}
        >
          <Text style={{ fontSize: 10, color: '#fff' }}>Cancel</Text>
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

UploadButton.propTypes = {
  uploadButton: PropTypes.bool.isRequired,
  setUploadButton: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  UploadProfile: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: 'white'
  },
});

export default UploadButton;
