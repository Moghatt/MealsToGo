import ListAccordion from "../../../components/ListAccordion";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";
export const RestaurantsDetailScreen = ({ route }) => {
  return (
    <>
      <View style={{ backgroundColor: "white", padding: 4 }}>
        {/* Wrap RestaurantInfoCard with a View to apply styles */}
        <RestaurantInfoCard restaurant={route.params.restaurant} />
      </View>
      <ScrollView>
        <ListAccordion />
      </ScrollView>
    </>
  );
};
