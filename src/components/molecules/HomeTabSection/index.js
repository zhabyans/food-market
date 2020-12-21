import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { FoodDummy1, FoodDummy2 } from "../../../assets";
import ItemListFood from "../ItemListFood";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({ route, focused }) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerNewTaste}>
      <ItemListFood
        key={1}
        type="product"
        name="Ketan"
        price="20000"
        rating={1}
        image={FoodDummy1}
        onPress={() => navigation.navigate("FoodDetail", item)}
      />
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerPopular}>
      <ItemListFood
        key={1}
        type="product"
        name="Kentang"
        price="12000"
        rating={1}
        image={FoodDummy2}
        onPress={() => navigation.navigate("FoodDetail", item)}
      />
    </View>
  );
};

const Recommended = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerRecommended}>
      <ItemListFood
        key={1}
        type="product"
        name="Kacang"
        price="40000"
        rating={1}
        image={FoodDummy2}
        onPress={() => navigation.navigate("FoodDetail", item)}
      />
    </View>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "1", title: "New Taste" },
    { key: "2", title: "Popular" },
    { key: "3", title: "Recommended" },
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: Recommended,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
      swipeEnabled
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  tabView: { backgroundColor: "white" },
  indicator: {
    backgroundColor: "#020202",
    height: 3,
    width: "15%",
    marginLeft: "3%",
  },
  tabBarStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  tabStyle: { width: "auto" },
  tabText: (focused) => ({
    fontFamily: "Poppins-Medium",
    color: focused ? "#020202" : "#8D92A3",
  }),
  containerNewTaste: { paddingTop: 8, paddingHorizontal: 24 },
  containerPopular: { paddingTop: 8, paddingHorizontal: 24 },
  containerRecommended: { paddingTop: 8, paddingHorizontal: 24 },
});
