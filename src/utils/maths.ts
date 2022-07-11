const GM = 3.986004418 * Math.pow(10, 14); // m3/s-2 @see https://en.wikipedia.org/wiki/Standard_gravitational_parameter
const EARTH_MEAN_RADIUS_IN_KM = 6371; // km @see https://en.wikipedia.org/wiki/Earth
const EARTH_MEAN_RADIUS = EARTH_MEAN_RADIUS_IN_KM * 1000; // m

export const getOrbitalSpeed = (altInKm: number) => {
  const r = EARTH_MEAN_RADIUS + altInKm * 1000;
  return parseFloat(Math.sqrt(GM / r).toFixed(8));
};
