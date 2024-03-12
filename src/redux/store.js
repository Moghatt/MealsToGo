import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { restaurantsApi } from "../services/restaurants/restaurantsApi";
import { locationApi } from "../services/location/locationApi";
import locationReducer from "../services/location/locationSlice";
import RestaurantsReducer from "../services/restaurants/restaurantsSlice";
import FavouritesReducer from "../services/favourites/favouritesSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    favourites: FavouritesReducer,
    restaurants: RestaurantsReducer,
    location: locationReducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantsApi.middleware, locationApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
