import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    lat: 41.878113,
    lng: -87.629799,
    viewport: {
      northeast: {
        lat: 41.88758823029149,
        lng: -87.6194830697085,
      },
      southwest: {
        lat: 41.88489026970849,
        lng: -87.6221810302915,
      },
    },
  },
  isLocationLoading: false,
  searchKeyword: "chicago",
  // onSearch: () => null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
    setLoading: (state, action) => {
      state.isLocationLoading = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },

    // onSearch: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   // state.value += 1;
    // },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateLocation, setLoading, setSearchKeyword } =
  locationSlice.actions;

export default locationSlice.reducer;
