import { NavigationHelpersContext } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header, TextInput } from "../../components";
import { useForm } from "../../utils";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = () => {
    // console.log(form);
    dispatch({ type: "SET_REGISTER", value: form });
    navigation.navigate("SignUpAddress");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header title="Sign Up" subTitle="Register and eat" onBack={() => {}} />
        <View style={styles.container}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <View style={styles.photoContainer}>
                <Text style={styles.addPhoto}>Add{"\n"}Photo</Text>
              </View>
            </View>
          </View>
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
