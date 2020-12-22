import Axios from "axios";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Button, Gap, Header, TextInput } from "../../components";
import useForm from "../../utils/useForm";

const SignIn = ({ navigation }) => {
  console.log("render signin page");
  const [form, setForm] = useForm({
    email: "",
    password: "",
  });

  // #MATERI AXIOS PROMISE
  // const onSubmit = () => {
  //   console.log(form);
  //   Axios.post("http://foodmarket-backend.buildwithangga.id/api/login", form)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // #MATERI AXIOS ASYNC AWAIT
  const onSubmit = async () => {
    console.log(form);
    try {
      const data = await Axios.post(
        "http://foodmarket-backend.buildwithangga.id/api/login",
        form
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Find your best ever meal" />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          onChangeText={(e) => setForm("email", e)}
          value={form.email}
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          onChangeText={(e) => setForm("password", e)}
          value={form.password}
          secureTextEntry
        />
        <Gap height={24} />
        <Button text="Sign In" color="#FFC700" onPress={onSubmit} />
        <Gap height={12} />
        <Button
          text="Create New Account"
          color="#8D92A3"
          textColor="white"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
};

export default SignIn;

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
