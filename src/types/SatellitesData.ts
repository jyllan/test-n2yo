export type SatellitePositionData = {
  satlatitude: number;
  satlongitude: number;
  sataltitude: number;
  azimuth: number;
  elevation: number;
  ra: number;
  dec: number;
  timestamp: number;
  eclipsed: boolean;
};

export type SatellitePositionInfo = {
  satname: string;
  satid: number;
  transactionscount: number;
};

export type SatellitePositions = {
  info: SatellitePositionInfo;
  positions: SatellitePositionData[];
};

export type SatellitePassesInfo = SatellitePositionInfo & {
  passescount: number;
};

export type SatellitePassesData = {
  startAz: number;
  startAzCompass: string;
  startEl: number;
  startUTC: number;
  maxAz: number;
  maxAzCompass: string;
  maxEl: number;
  maxUTC: number;
  endAz: number;
  endAzCompass: string;
  endEl: number;
  endUTC: number;
  mag: number;
  duration: number;
};

export type VisualPasses = {
  info: SatellitePassesInfo;
  passes: SatellitePassesData[];
};

export type SatelliteData = VisualPasses & {
  position: SatellitePositions['positions'][number];
};
