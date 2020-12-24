import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ProfileTabSection } from "../../components";
import { API_HOST } from "../../config";
import { getData, showMessage, showToast, storeData } from "../../utils";

const Profile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    navigation.addListener("focus", () => {
      updateUserProfile();
    });
    console.log("userProfile", userProfile);
  }, [navigation]);

  const updateUserProfile = () => {
    getData("userProfile").then((res) => {
      setUserProfile(res);
    });
  };

  const updatePhoto = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.5,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        showToast("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        showToast("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        showToast("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        showToast(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      const dataImage = {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      };
      const photoForUpload = new FormData();
      photoForUpload.append("file", dataImage);
      getData("token").then((resToken) => {
        Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
          headers: {
            Authorization: resToken.value,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            getData("userProfile").then((resUser) => {
              resUser.profile_photo_url = `${API_HOST.storage}/${res.data.data[0]}`;
              storeData("userProfile", resUser).then(() => {
                showToast("Update Photo Berhasil", "success");
                updateUserProfile();
              });
            });
          })
          .catch((err) => {
            showToast(
              `${err?.response?.data?.message} on Update Photo API` ||
                "Terjadi kesalahan di API Update Photo"
            );
          });
      });
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <TouchableOpacity
            onPress={() => {
              updatePhoto("photo");
            }}
          >
            <View style={styles.borderPhoto}>
              <Image
                source={{ uri: userProfile.profile_photo_url }}
                style={styles.photoContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { flex: 1, marginTop: 24 },
  profileDetail: { backgroundColor: "white", paddingBottom: 26 },
  name: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#020202",
    textAlign: "center",
  },
  email: {
    fontSize: 13,
    fontFamily: "Poppins-Light",
    color: "#8D92A3",
    textAlign: "center",
  },
  photo: { alignItems: "center", marginTop: 26, marginBottom: 16 },
  borderPhoto: {
    borderWidth: 1,
    borderColor: "#8D92A3",
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#F0F0F0",
    padding: 24,
  },
});
