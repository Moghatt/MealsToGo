import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation, setLoading, setSearchKeyword } from "../../../services/location/locationSlice";
import { useLazyGetSearchQuery } from "../../../services/location/locationApi";
import _ from "lodash";
import useDebounce from "../../../hooks/useDebounce";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((state) => state.location);
  // const debouncedSearchKeyword = useDebounce(searchKeyword, 200);
  const [trigger, result, lastPromiseInfo] = useLazyGetSearchQuery();
  // console.log(result, lastPromiseInfo);
  // useEffect(() => {
  //   if (result.data) {
  //     dispatch(updateLocation(result.data));
  //     dispatch(setLoading(false));
  //   }
  // }, [result.data, dispatch]);
  const handleSearchSubmit = () => {
    if (searchKeyword.length !== 0 && searchKeyword.trim() !== "") {
      const promise = trigger(searchKeyword.trim().toLowerCase(), true);
      promise.unwrap().then((res) => {
        dispatch(updateLocation(res));
        dispatch(setLoading(false));
      });
    }
  };

  return (
    <SearchContainer>
      <Searchbar
        icon="map"
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={handleSearchSubmit}
        onChangeText={(text) => {
          dispatch(setSearchKeyword(text));
        }}
      />
    </SearchContainer>
  );
};
