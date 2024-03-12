import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import styled from "styled-components";
import { Search } from "../components/search.component";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info.component";

import { useDispatch } from "react-redux";
import { deleteFavourite } from "../../../services/favourites/favouritesSlice";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export default function MapScreen({ navigation }) {
  const { location } = useSelector((state) => state.location);
  const { favourites } = useSelector((state) => state.favourites);
  // console.log(favourites);

  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurants);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    dispatch(deleteFavourite());

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport, dispatch]);
  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              {/* <RestaurantInfoCard restaurant={restaurant} /> */}
              <Callout
                onPress={() => console.log(navigation.navigate("RestaurantDetail", { restaurant }))}
                // {navigation.navigate("RestaurantDetail", { restaurant })}
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
}
