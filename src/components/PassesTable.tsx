import clsx from 'clsx';
import moment from 'moment';
import React, { useMemo } from 'react';
import Table, { Icolumn } from 'react-tailwind-table';

import 'react-tailwind-table/dist/index.css';

import { SatellitePassesData } from '@/types/SatellitesData';

export const PASSES_PER_ROW = 10;
type SatellitePassesDataFormated = SatellitePassesData & {
  startUTCFormated: string;
  endUTCFormated: string;
  maxUTCFormated: string;
};
export default function PassesTable({ data }: { data: SatellitePassesData[] }) {
  const columns: Icolumn[] = [
    { field: 'startAz', use: 'Satellite start azimuth (degrees)' },
    { field: 'startAzCompass', use: 'Satellite start azimuth (compass)' },
    { field: 'startEl', use: 'Satellite start elevation (degrees)' },
    { field: 'startUTC', use: 'Start UNIX time' },
    { field: 'startUTCFormated', use: 'Start time' },
    { field: 'maxAz', use: 'Satellite max azimuth (degrees)' },
    { field: 'maxAzCompass', use: 'Satellite max azimuth (compass)' },
    { field: 'maxEl', use: 'Satellite max elevation (degrees)' },
    { field: 'maxUTC', use: 'UNIX time for max elevation' },
    { field: 'maxUTCFormated', use: 'Time for max elevation' },
    { field: 'endAz', use: 'Satellite end azimuth (degrees)' },
    { field: 'endAzCompass', use: 'Satellite end azimuth (compass)' },
    { field: 'endEl', use: 'Satellite end elevation (degrees)' },
    { field: 'endUTC', use: 'End UNIX time' },
    { field: 'endUTCFormated', use: 'End time' },
    { field: 'mag', use: 'Max visual magnitude' },
    { field: 'duration', use: 'Total visible duration (seconds)' },
  ];

  const rows: SatellitePassesDataFormated[] = useMemo(
    () =>
      data.map((satellitePassesData) => {
        return {
          ...satellitePassesData,
          startUTCFormated: moment
            .unix(satellitePassesData.startUTC)
            .toLocaleString(),
          endUTCFormated: moment
            .unix(satellitePassesData.endUTC)
            .toLocaleString(),
          maxUTCFormated: moment
            .unix(satellitePassesData.maxUTC)
            .toLocaleString(),
        };
      }),
    [data]
  );

  return (
    <div className='passes-table'>
      <Table
        columns={columns}
        rows={rows}
        per_page={PASSES_PER_ROW}
        show_search={false}
        should_export={false}
        styling={{
          main: 'passes-table__content',
          top: {
            elements: {
              main: 'passes-table__header',
            },
          },
          footer: {
            main: clsx(
              'passes-table__footer',
              data.length <= PASSES_PER_ROW && 'passes-table__footer--hidden'
            ),
          },
        }}
      />
    </div>
  );
}
