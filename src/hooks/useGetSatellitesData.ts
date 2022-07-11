import { SatellitePositions } from '@/types/SatellitesData';
import { VisualPasses } from '@/types/VisualPasses';

export const useGetSatellitesData = () => {
  return {
    get: async () => {
      const satellitesPositions: SatellitePositions[] = await (
        await fetch('/api/positions')
      ).json();
      const visualPasses: VisualPasses[] = await (
        await fetch('/api/visualPasses')
      ).json();

      // satellites are in the same order in both arrays
      return visualPasses.map((visualPass, i) => {
        return {
          ...visualPass,
          position: satellitesPositions[i].positions[0],
        };
      });
      // console.log('HELL YEAH positions', satellitesPositions);
      // console.log('HELL YEAH visualPasses', visualPasses);
    },
  };
};
