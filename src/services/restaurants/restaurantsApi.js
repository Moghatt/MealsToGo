// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { restaurantsRequest, restaurantsTransform } from "../../services/restaurants/restaurants.service";

const customRequest = async (arg, { signal, queryFn, baseUrl }) => {
  const res = await restaurantsRequest(arg);

  // Apply your custom transformation logic here
  const transformedData = restaurantsTransform(res);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: transformedData }), 2000);
  });
};
// Define a service using a base URL and expected endpoints
export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  baseQuery: customRequest,
  endpoints: (builder) => ({
    // getPokemonByName: builder.query({
    //   query: (name) => `pokemon/${name}`,
    // }),
    getData: builder.query({
      query: (loc) => loc,
      provideTags: (result, error, keyword) => [{ type: "restaurant", keyword }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = restaurantsApi;
export const { useGetDataQuery } = restaurantsApi;
