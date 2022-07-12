import { SatellitePositions, VisualPasses } from '@/types/SatellitesData';

export const useGetSatellitesData = () => {
  return {
    get: async () => {
      try {
        // call the api in parallel
        const data = await Promise.all(
          ['/api/positions', '/api/visualPasses'].map(async (url) => {
            return await (await fetch(url)).json();
          })
        );

        const satellitesPositions: SatellitePositions[] = data[0];
        const visualPasses: VisualPasses[] = data[1];

        // satellites are in the same order in both arrays
        return visualPasses.map((visualPass, i) => {
          return {
            ...visualPass,
            position: satellitesPositions[i].positions[0],
          };
        });
      } catch (error) {
        return undefined;
      }
    },
  };
};
