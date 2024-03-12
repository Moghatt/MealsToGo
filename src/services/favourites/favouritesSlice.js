import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Async thunk for fetching data from AsyncStorage
export const fetchFavourites = createAsyncThunk("favourites/fetchFavourites", async () => {
  try {
    const storedData = await AsyncStorage.getItem("@favourites");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    throw error;
  }
});

// Async thunk for adding a new item to favourites
export const addFavourite = createAsyncThunk("favourites/addFavourite", async (newItem) => {
  try {
    const storedData = await AsyncStorage.getItem("@favourites");
    console.log(storedData);
    const currentData = storedData ? JSON.parse(storedData) : [];
    const updatedData = [...currentData, newItem];
    // console.log(updatedData)
    await AsyncStorage.setItem("@favourites", JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    console.log(error);
  }
});

// Async thunk for deleting an item from favourites
export const deleteFavourite = createAsyncThunk("favourites/deleteFavourite", async (id) => {
  try {
    const storedData = await AsyncStorage.getItem("@favourites");
    const currentData = storedData ? JSON.parse(storedData) : [];
    console.log(id);
    const updatedData = currentData.filter((item) => item.placeId !== id);
    await AsyncStorage.setItem("@favourites", JSON.stringify(updatedData));

    return updatedData;
  } catch (error) {
    throw error;
  }
});

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
  },
  // reducers: {
  //   addToFavourites: (state, action) => {
  //     state.favourites.push(action.payload);
  //   },
  //   removeFromFavourites: (state, action) => {
  //     state.favourites = state.favourites.filter((item) => item.placeId !== action.payload.placeId);
  //   },
  //   clear: (state) => {
  //     state.favourites = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.favourites = action.payload;
      });
  },
});

// export const { addToFavourites, removeFromFavourites, clear } = favouritesSlice.actions;

export default favouritesSlice.reducer;
