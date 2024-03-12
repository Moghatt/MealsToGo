// import React, { useState } from "react";
// import styled from "styled-components/native";
// import { Searchbar } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import { updateLocation, setLoading, setSearchKeyword } from "../../../services/location/locationSlice";
// import { useLazyGetSearchQuery } from "../../../services/location/locationApi";
// import _ from "lodash";
// import useDebounce from "../../../hooks/useDebounce";
// const SearchContainer = styled.View`
//   padding: ${(props) => props.theme.space[3]};
// `;

// export const Search = () => {
//   const dispatch = useDispatch();
//   const { searchKeyword } = useSelector((state) => state.location);
//   // const [searchKeyword, setSearchKeyword] = useState("chicago");
//   const debouncedSearchKeyword = useDebounce(searchKeyword, 87);
//   const { refetch, isFetching } = useLazyGetSearchQuery(debouncedSearchKeyword.trim().toLowerCase());
//   // console.log(searchKeyword);

//   const handleSearchSubmit = () => {
//     if (searchKeyword.length !== 0 && searchKeyword.trim() !== "") {
//       refetch().then((res) => {
//         // console.log(res.data);
//         // Assuming your API call returns data in the 'newData' variable
//         dispatch(updateLocation(res.data));
//         dispatch(setLoading(false));
//       });
//     }
//   };

//   return (
//     <SearchContainer>
//       <Searchbar
//         placeholder="Search for a location"
//         value={searchKeyword}
//         onSubmitEditing={handleSearchSubmit}
//         onChangeText={(text) => {
//           dispatch(setSearchKeyword(text));
//         }}
//       />
//     </SearchContainer>
//   );
// };

//--------------------------------------------------
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation, setLoading, setSearchKeyword } from "../../../services/location/locationSlice";
import { useLazyGetSearchQuery } from "../../../services/location/locationApi";
import useDebounce from "../../../hooks/useDebounce";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((state) => state.location);
  // const debouncedSearchKeyword = useDebounce(searchKeyword, 200);
  const [trigger, result, lastPromiseInfo] = useLazyGetSearchQuery();
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
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
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
