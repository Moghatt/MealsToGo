import React, { useEffect } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  addFavourite,
  fetchFavourites,
  deleteFavourite,
} from "../../services/favourites/favouritesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.favourites);
  // console.log(favourites);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the thunk to fetch favourites
        dispatch(fetchFavourites());
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isFavourite = favourites?.find((r) => r.placeId === restaurant.placeId);
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite ? dispatch(addFavourite(restaurant)) : dispatch(deleteFavourite(restaurant.placeId))
      }
    >
      <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? "red" : "white"} />
    </FavouriteButton>
  );
};
