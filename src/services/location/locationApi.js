// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { locationRequest, locationTransform } from "./location.service";

const customRequest = async (args, { signal, dispatch, getState }, extraOptions) => {
  try {
    if (args === undefined) {
      return { data: {} };
    }
    // Early return if args are missing or empty
    if (!args) {
      return { data: {} };
    }

    // Fetch data using locationRequest
    // console.log(args.toLowerCase());
    const data = await locationRequest(args.toLowerCase());
    // console.log("inside" + data);
    // Apply your custom transformation logic here
    const transformedData = locationTransform(data);

    // Simulate delay before resolving
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { data: transformedData || {} };
  } catch (error) {
    // Handle errors gracefully
    console.error("Error in customRequest:", error);
    return { error: { message: "An error occurred while fetching data." } };
  }
};

// Define a service using a base URL and expected endpoints
export const locationApi = createApi({
  reducerPath: "locationApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  baseQuery: customRequest,
  endpoints: (builder) => ({
    // getPokemonByName: builder.query({
    //   query: (name) => `pokemon/${name}`,
    // }),
    getSearch: builder.query({ query: (keyword) => keyword }),
    // getUser: builder.query({
    //   queryFn: async (userId) => {
    //     try {
    //       const user = await getSearch()
    //       // Return the result in an object with a `data` field
    //       return { data: user }
    //     } catch (error) {
    //       // Catch any errors and return them as an object with an `error` field
    //       return { error }
    //     }
    //   },
    // }),
  }),
});
// console.log(locationApi);

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = locationApi;
export const { useLazyGetSearchQuery } = locationApi;
