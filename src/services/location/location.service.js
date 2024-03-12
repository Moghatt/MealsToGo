import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm] || null;
    resolve(locationMock || []);
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const firstResult = formattedResponse?.results?.[0] || {};
  const { geometry = {} } = firstResult;
  const { lat = 0, lng = 0 } = geometry.location || {};

  return { lat, lng, viewport: geometry.viewport };
};
