import React from "react";
import { StyleSheet, View } from "react-native";
import { EmptyOrder } from "../../components";

const Order = () => {
  return (
    <>
      <View style={styles.page}>
        {/* {orders.length < 1 ? ( */}
        <EmptyOrder />
        {/* ) : (
        <View style={styles.content}>
          <Header title="Your Orders" subTitle="Wait for the best meal" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      )} */}
      </View>
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { flex: 1 },
  tabContainer: { flex: 1, marginTop: 24 },
});
