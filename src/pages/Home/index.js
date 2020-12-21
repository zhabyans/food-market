import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FoodDummy6 } from "../../assets";
import { FoodCard, Gap, HomeProfile, HomeTabSection } from "../../components";

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={24} />
              <FoodCard
                key={1}
                name="Ketan"
                image={FoodDummy6}
                rating={2}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.tabContainer}>
          <HomeTabSection />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: { flex: 1 },
  foodCardContainer: { flexDirection: "row", marginVertical: 24 },
  tabContainer: { flex: 1 },
});
