import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import MapScreen from "../../features/map/screens/map.screen";

import { RestaurantsNavigator } from "./restaurants.navigator";

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

const TAB_ICON = {
  Restaurants: "restaurant",
  Maps: "map",
  Settings: "settings",
};

const getTabBarIcon = (route, focused, color, size) => {
  let iconName = focused ? TAB_ICON[route.name] : `${TAB_ICON[route.name]}-outline`;
  return <Ionicons name={iconName} size={size} color={color} />;
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
});

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
