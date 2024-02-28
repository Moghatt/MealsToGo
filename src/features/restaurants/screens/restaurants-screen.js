import { StyleSheet, Text, View, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { PaperProvider, Searchbar } from "react-native-paper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ExpoStatusBar />
        <View style={styles.search}>
          <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
        </View>
        <View style={styles.list}>
          <RestaurantInfoCard />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "blue",
  },
});

export default RestaurantsScreen;
