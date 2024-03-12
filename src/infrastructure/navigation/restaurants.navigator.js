import { createStackNavigator } from "@react-navigation/stack";
import RestaurantsScreen from "../../features/restaurants/screens/restaurants-screen";
const RestaurantStack = createStackNavigator();
import { RestaurantsDetailScreen } from "../../features/restaurants/screens/restaurans.detail.screen";
import { Text, View } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";

function MapsS() {
  return (
    <View>
      <Text>MAPhgdf!</Text>
    </View>
  );
}
export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      initialRouteName="RestaurantsScreen"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      })}
    >
      <RestaurantStack.Screen name="RestaurantsScreen" component={RestaurantsScreen} />
      <RestaurantStack.Screen name="RestaurantDetail" component={RestaurantsDetailScreen} />
    </RestaurantStack.Navigator>
  );
};
