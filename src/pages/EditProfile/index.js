import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Gap, Header, Select, TextInput } from "../../components";

const EditProfile = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          subTitle="Update your profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value="uji coba"
            // onChangeText={(value) => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value="uji coba"
            // onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value="uji coba"
            // onChangeText={(value) => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your house number"
            value="uji coba"
            // onChangeText={(value) => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            value="uji coba"
            // onChangeText={(value) => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value="uji coba"
            // onSelectChange={(value) => setForm('city', value)}
          />
          <Gap height={24} />
          <Button text="Update" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  page: { flex: 1 },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
