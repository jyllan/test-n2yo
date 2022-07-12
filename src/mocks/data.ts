import {
  SatelliteData,
  SatellitePassesData,
  SatellitePassesInfo,
  SatellitePositionData,
} from '@/types/SatellitesData';

export const mockedSatellitePassesInfo: SatellitePassesInfo = {
  satid: 25544,
  satname: 'SPACE STATION',
  transactionscount: 4,
  passescount: 3,
};
export const mockedSatellitePassesInfo2: SatellitePassesInfo = {
  satid: 36516,
  satname: 'SES 1',
  transactionscount: 5,
  passescount: 6,
};

export const mockedPasses: SatellitePassesData[] = [
  {
    startAz: 307.21,
    startAzCompass: 'NW',
    startEl: 13.08,
    startUTC: 1521368025,
    maxAz: 225.45,
    maxAzCompass: 'SW',
    maxEl: 78.27,
    maxUTC: 1521368345,
    endAz: 132.82,
    endAzCompass: 'SE',
    endEl: 0,
    endUTC: 1521368660,
    mag: -2.4,
    duration: 485,
  },
  {
    startAz: 311.56,
    startAzCompass: 'NW',
    startEl: 50.94,
    startUTC: 1521451295,
    maxAz: 37.91,
    maxAzCompass: 'NE',
    maxEl: 52.21,
    maxUTC: 1521451615,
    endAz: 118.61,
    endAzCompass: 'ESE',
    endEl: 0,
    endUTC: 1521451925,
    mag: -2,
    duration: 325,
  },
];

export const mockedPosition: SatellitePositionData = {
  satlatitude: -39.90318514,
  satlongitude: 158.28897924,
  sataltitude: 417.85,
  azimuth: 254.31,
  elevation: -69.09,
  ra: 44.77078138,
  dec: -43.99279118,
  timestamp: 1521354418,
  eclipsed: false,
};

export const mockedPosition2: SatellitePositionData = {
  satlatitude: 0.0259331,
  satlongitude: -100.99199479,
  sataltitude: 35774.15,
  azimuth: 280.15,
  elevation: -16.99,
  ra: 108.1912942,
  dec: -6.23463939,
  timestamp: 1657652215,
  eclipsed: false,
};

export const mockedSatellitesData: SatelliteData[] = [
  {
    info: mockedSatellitePassesInfo,
    passes: mockedPasses,
    position: mockedPosition,
  },
  {
    info: mockedSatellitePassesInfo2,
    passes: [],
    position: mockedPosition2,
  },
];
