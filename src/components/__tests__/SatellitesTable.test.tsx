import { render, screen, waitFor } from '@testing-library/react';
import { debug } from 'jest-preview';

import SatellitesTable from '@/components/SatellitesTable';

import {
  mockedSatellitePassesInfo,
  mockedSatellitePassesInfo2,
  mockedSatellitesData,
} from '@/mocks/data';
import { DAYS_OF_PREDICTION } from '@/pages/api/visualPasses';
import * as MathsUtils from '@/utils/maths';

jest.mock('@/components/PassesTable', () => () => {
  const MockName = () => <>display satellite table</>;
  return <MockName />;
});

beforeEach(() => {
  jest.clearAllMocks();
});
describe(`Given 'SatellitesTable' is rendered`, () => {
  it('should list the Satellites Info', async () => {
    render(<SatellitesTable data={mockedSatellitesData} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    expect(
      screen.queryByText(mockedSatellitePassesInfo.satname)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockedSatellitePassesInfo2.satname)
    ).toBeInTheDocument();
  });

  it('should display the calculated orbital speed of each satellite', async () => {
    jest
      .spyOn(MathsUtils, 'getOrbitalSpeed')
      .mockReturnValueOnce(123456)
      .mockReturnValueOnce(234567);
    render(<SatellitesTable data={mockedSatellitesData} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    expect(screen.queryByText(123456)).toBeInTheDocument();
    expect(screen.queryByText(234567)).toBeInTheDocument();
  });

  it('should display the calculated orbital speed of each satellite', async () => {
    jest
      .spyOn(MathsUtils, 'getOrbitalSpeed')
      .mockReturnValueOnce(123456)
      .mockReturnValueOnce(234567);
    render(<SatellitesTable data={mockedSatellitesData} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    expect(screen.queryByText(123456)).toBeInTheDocument();
    expect(screen.queryByText(234567)).toBeInTheDocument();
  });

  it('should display SatellitesTable or empty message depending on passes object', async () => {
    render(<SatellitesTable data={mockedSatellitesData} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    expect(screen.queryByText('display satellite table')).toBeInTheDocument();
    expect(
      screen.queryByText(
        `No visual passes in the next ${DAYS_OF_PREDICTION} days`
      )
    ).toBeInTheDocument();
  });
});
