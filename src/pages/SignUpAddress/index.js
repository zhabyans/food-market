import Axios from "axios";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header, Select, TextInput } from "../../components";
import { showToast, useForm } from "../../utils";

const SignUpAddress = ({ navigation }) => {
  const dispatch = useDispatch();
  console.log("render signupaddress");
  const [form, setForm] = useForm({
    phoneNumber: "",
    address: "",
    houseNumber: "",
    city: "Bandung",
  });
  const { registerReducer, photoReducer } = useSelector((state) => state);

  const onSubmit = () => {
    dispatch({ type: "SET_LOADING", value: true });
    const data = {
      ...form,
      ...registerReducer,
    };
    console.log("photoReducer.isUploadPhoto", photoReducer.isUploadPhoto);
    Axios.post("http://foodmarket-backend.buildwithangga.id/api/register", data)
      .then((res) => {
        if (photoReducer.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append("file", photoReducer);
          Axios.post(
            "http://foodmarket-backend.buildwithangga.id/api/user/photo",
            photoForUpload,
            {
              headers: {
                Authorization: `${res.data.data.token_type} ${res.data.data.access_token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
            .then((resPhoto) => {
              console.log("upload sukses", resPhoto);
            })
            .catch((err) => {
              console.log("upload gagal", err);
              showToast("upload gagal");
            });
        }
        console.log("register berhasil", res.data);
        showToast("Register Berhasil", "success");
        navigation.replace("SuccessSignUp");
        dispatch({ type: "SET_LOADING", value: false });
      })
      .catch((err) => {
        console.log("register gagal", err);
        dispatch({ type: "SET_LOADING", value: false });
        showToast(
          err?.response?.data?.message ?? "Eror tidak diketahui",
          "danger"
        );
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it’s valid"
          onBack={() => {}}
        />
        <View style={styles.container}>
          <TextInput
            label="Phone No."
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={(e) => setForm("phoneNumber", e)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={(e) => setForm("address", e)}
          />
          <Gap height={16} />
          <TextInput
            label="House No."
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={(e) => setForm("houseNumber", e)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={(e) => setForm("city", e)}
          />
          <Gap height={24} />
          <Button text="Sign Up Now" color="#FFC700" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
