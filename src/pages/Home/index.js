import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FoodDummy6 } from "../../assets";
import { FoodCard, Gap, HomeProfile, HomeTabSection } from "../../components";
import { getFoodData } from "../../redux/action";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { food } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodData());
  }, []);

  return (
    <ScrollView>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={24} />
              {food.map((item, index) => {
                return (
                  <FoodCard
                    key={item.id}
                    name={item.name}
                    image={{ uri: item.picturePath }}
                    rating={item.rate}
                    onPress={() => navigation.navigate("FoodDetail", item)}
                  />
                );
              })}
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
