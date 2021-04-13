import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert, TouchableOpacity } from "react-native";
import CustomText from "../../components/UI/CustomText";
import Messages from "../../messages/user";
import Colors from "../../utils/Colors";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { UploadProfilePic } from "../../reducers";
import { EditButton, ProfilePic, ProfileBody } from "./components";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
//component
import { Header } from "./components"
//Loader
import Loader from "../../components/Loaders/Loader";
import { t } from "i18n-js";

const { width, height } = Dimensions.get("window");

export const ProfileScreen = (props)    => {
  const user = useSelector((state)      => state.auth.user);
  const loading = useSelector((state)   => state.auth.isLoading);
  const [imageUri, setImageUri]         = useState("");
  const [filename, setFilename]         = useState("");
  const [type, setType]                 = useState("");
  const [uploadButton, setUploadButton] = useState(true);

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
    try {
      await dispatch(UploadProfilePic(imageUri, filename, type))
      setUploadButton(true);
      if (!unmounted.current) {
        Alert.alert("Update", "Update successful", [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        {Object.keys(user).length === 0 ? (
      <View style={styles.center}>
        <CustomText style={{ color: Colors.water.blue }}>{Messages["user.login.require"]}</CustomText>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <View style={styles.nextButton}>
              <CustomText style={{ color: Colors.white, fontSize: 18 }}>Login</CustomText>
            </View>
          </TouchableOpacity>
      </View>
    ) : (
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              <EditButton navigation={props.navigation} user={user} />
              <ProfilePic
                user={user}
                imageUri={imageUri}
                setImageUri={setImageUri}
                setType={setType}
                setFilename={setFilename}
                setUploadButton={setUploadButton}
              />
              <ProfileBody
                user={user}
                uploadButton={uploadButton}
                setUploadButton={setUploadButton}
                setImageUri={setImageUri}
                loading={loading}
                UploadProfile={UploadProfile}
              />
            </View>
          </View>
        )}
      </View>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.15 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  profileBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width,
    alignItems: "center",
  },
});
//   return (
//     <>
//     <Header navigation={props.navigation} />
    // {Object.keys(user).length === 0 ? (
    //   <View style={styles.center}>
    //     <CustomText style={{ color: Colors.water.blue }}>{Messages["user.login.require"]}</CustomText>
    //       <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
    //         <View style={styles.nextButton}>
    //           <CustomText style={{ color: Colors.white, fontSize: 18 }}>Login</CustomText>
    //         </View>
    //       </TouchableOpacity>
    //   </View>
    // ) : (
//     <ActionSheetProvider>
//       <View>
//         <View style={styles.header}></View>
//         {loading ? <Loader /> : <></>}
//         <View style={styles.profileContainer}>
//           <View style={styles.profileBox}>
//             <EditButton navigation={props.navigation} user={user} />
//             <ProfilePic
//               user={user}
//               imageUri={imageUri}
//               setImageUri={setImageUri}
//               setType={setType}
//               setFilename={setFilename}
//               setUploadButton={setUploadButton}
//             />
//             <ProfileBody
//               user={user}
//               uploadButton={uploadButton}
//               setUploadButton={setUploadButton}
//               setImageUri={setImageUri}
//               loading={loading}
//               UploadProfile={UploadProfile}
//             />
//           </View>
//         </View>
//       </View>
//     </ActionSheetProvider>
//     )}
//     </>
//   );
// };

// const styles = StyleSheet.create({


//   container: {
//     flex: 1,
//   },
//   header: {
//     width,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   profileContainer: {
//     width,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileBox: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     width,
//     height,
//     justifyContent: 'center',
//     alignItems: "center",
//   },
// });
