import Axios from "axios";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header, Select, TextInput } from "../../components";
import { setLoading, signUpAction } from "../../redux/action";
import { showToast, useForm } from "../../utils";

const SignUpAddress = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    phoneNumber: "",
    address: "",
    houseNumber: "",
    city: "Bandung",
  });
  const { registerReducer, photoReducer } = useSelector((state) => state);

  const onSubmit = () => {
    dispatch(setLoading(true));
    const data = {
      ...form,
      ...registerReducer,
    };
    dispatch(signUpAction(data, photoReducer, navigation));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it’s valid"
          onBack={() => navigation.goBack()}
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
