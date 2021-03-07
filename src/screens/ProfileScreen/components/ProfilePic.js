import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActionSheetIOS,
  Platform,
  Dimensions
} from "react-native";
//Color
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import { _pickImage } from "../../../utils/Tools";
import CustomText from "../../../components/UI/CustomText";
import { useActionSheet } from "@expo/react-native-action-sheet";
//PropTypes check
import PropTypes from "prop-types";
import { set } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const ProfilePic = ({
  user,
  imageUri,
  setImageUri,
  setFilename,
  setType,
  setUploadButton,
}) => {
  const [error, setError] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const UploadProfileHandler = () => {
    const options = ["Take Photo", "Choose From Library", "Cancel"];

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 2,
        // cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        let result;
        if (buttonIndex === 2) {
          return;
        } else if (buttonIndex === 0) {
          const data = await _pickImage("camera");
          result = data;
        } else if (buttonIndex === 1) {
          const data = await _pickImage("library");
          result = data;
        }
        if (!result.cancelled) {
          let localUri = result.uri;
          let filename = localUri.split("/").pop();
          setImageUri(localUri);
          setFilename(filename);
          setType(result.type);
          setUploadButton(false);
        }
      }
    );
  };

  React.useEffect(() => {
    fetch(user.profilePicture)
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        // console.log(response.status, response.ok); // 404 false
      })
      .catch((error) => {
        // console.log("API failure" + error);
      });
  }, []);

  return (
    <View>
      <View style={{ height: 50, alignItems: "center" }}>
        {/* <Image
          style={styles.profilePic}
          source={
            imageUri.length === 0
              ? user.profilePicture.length === 0
                ? require("../../../assets/Images/defaultprofile.png")
                : { uri: user.profilePicture }
              : { uri: imageUri }
          }
        /> */}
        <Image
          style={styles.profilePic}
          source={
            error
              ? require("../../../assets/Images/defaultprofile.png")
              : { uri: user.profilePicture }
          }
        /> 
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            transform: [{ translateY: -110 }, { translateX: -5 }],
          }}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={UploadProfileHandler}>
              <FontAwesome name="camera" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomText style={styles.userName}>{user.name}</CustomText>
    </View>
  );
};

ProfilePic.propTypes = {
  user: PropTypes.object.isRequired,
  imageUri: PropTypes.string.isRequired,
  setImageUri: PropTypes.func.isRequired,
  setFilename: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setUploadButton: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [{ translateY: -70 }],
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.leave_gold,
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.leave_gold,
    textAlign: "center",
  },
});
