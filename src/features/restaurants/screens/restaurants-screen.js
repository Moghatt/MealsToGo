import { FlatList, View, TextInput, TouchableOpacity } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useGetDataQuery } from "../../../services/restaurants/restaurantsApi";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants } from "../../../services/restaurants/restaurantsSlice";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

function RestaurantsScreen({ navigation }) {
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.favourites);
  const { location, isLocationLoading } = useSelector((state) => state.location);

  const { data: restaurants, error, isFetching } = useGetDataQuery(`${location.lat},${location.lng}`);
  React.useEffect(() => {
    if (restaurants) {
      dispatch(setRestaurants(restaurants));
    }
  }, [restaurants, dispatch]);
  if (location.lat === 0 && location.lng === 0) {
    return (
      <View>
        <TextInput>not found</TextInput>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <TextInput>somthing wen wrong</TextInput>
      </View>
    );
  }
  if (isFetching || isLocationLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color="blue" />
      </LoadingContainer>
    );
  }
  return (
    <PaperProvider>
      <ExpoStatusBar />
      <Search isFavouritesToggled={isToggled} onFavouritesToggle={() => setIsToggled(!isToggled)} />
      {isToggled && <FavouritesBar favourites={favourites} />}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}>
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </PaperProvider>
  );
}

export default RestaurantsScreen;
