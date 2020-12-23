import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header, TextInput } from "../../components";
import { showToast, useForm } from "../../utils";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const SignUp = ({ navigation }) => {
  const { registerReducer, photoReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState("");

  const onSubmit = () => {
    dispatch({ type: "SET_REGISTER", value: form });
    navigation.navigate("SignUpAddress");
  };

  const addPhoto = (type) => {
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
      setPhoto(() => ({ uri: response.uri }));
      dispatch({ type: "SET_PHOTO", value: dataImage });
      dispatch({ type: "SET_UPLOAD_STATUS", value: true });
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Sign Up"
          subTitle="Register and eat"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => addPhoto("photo")}>
            <View style={styles.photo}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Add{"\n"}Photo</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value={form.name}
            onChangeText={(e) => setForm("name", e)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={form.email}
            onChangeText={(e) => setForm("email", e)}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChangeText={(e) => setForm("password", e)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button text="Continue" color="#FFC700" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: "Poppins-Light",
    color: "#8D92A3",
    textAlign: "center",
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
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
  photo: {
    alignItems: "center",
    marginTop: 26,
    marginBottom: 16,
  },
});
