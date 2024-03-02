import React from "react";
import RestaurantsScreen from "./src/features/restaurants/screens/restaurants-screen";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

function MapsScreen() {
  return (
    <View>
      <Text>MAP!</Text>
    </View>
  );
}

const TAB_ICON = {
  Restaurants: "restaurant",
  Map: "map",
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

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
          <Tab.Screen name="Maps" component={MapsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
