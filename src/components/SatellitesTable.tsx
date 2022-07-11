import React, { useMemo } from 'react';
import Table, { Icolumn, Irow } from 'react-tailwind-table';

import 'react-tailwind-table/dist/index.css';

import PassesTable from '@/components/PassesTable';

import { DAYS_OF_PREDICTION } from '@/pages/api/visualPasses';
import { getOrbitalSpeed } from '@/utils/maths';

import { SatelliteData } from '@/types/SatellitesData';

export default function SatellitesTable({ data }: { data: SatelliteData[] }) {
  const columns: Icolumn[] = [
    {
      field: 'info.satid',
      use: 'ID',
    },
    {
      field: 'info.satname',
      use: 'Name',
    },
    {
      field: 'orbitalSpeed',
      use: 'Orbital Speed (m/s)',
    },
    {
      field: 'passes',
      use: 'Passes',
    },
  ];

  type Irender_row = (
    row: Irow,
    col: Icolumn,
    display_value: JSX.Element | string
  ) => JSX.Element | string;

  const rowRender: Irender_row = (row, column, display_value) => {
    if (column.field === 'passes') {
      if (row.passes) {
        return <PassesTable data={row.passes} />;
      } else {
        return `No visual passes in the next ${DAYS_OF_PREDICTION} days`;
      }
    }

    return display_value;
  };

  const rows: SatelliteData[] = useMemo(
    () =>
      data
        .map((satelliteData) => {
          return {
            ...satelliteData,
            orbitalSpeed: getOrbitalSpeed(satelliteData.position.sataltitude),
          };
        })
        .sort((a, b) => a.orbitalSpeed - b.orbitalSpeed),
    [data]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      row_render={rowRender}
      show_search={false}
      should_export={false}
      styling={{
        table_head: {
          table_data: 'satellites-table__data',
        },
      }}
    />
  );
}
