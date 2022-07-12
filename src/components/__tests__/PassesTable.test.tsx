import { render, screen, waitFor } from '@testing-library/react';
import { debug } from 'jest-preview';
import moment from 'moment';

import PassesTable, { PASSES_PER_ROW } from '@/components/PassesTable';

import { mockedPasses } from '@/mocks/data';

describe(`Given 'PassesTabled' is rendered`, () => {
  it('should list the SatellitePassesData', async () => {
    render(<PassesTable data={mockedPasses} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    expect(screen.queryByText(mockedPasses[0].startUTC)).toBeInTheDocument();
    expect(screen.queryByText(mockedPasses[1].startUTC)).toBeInTheDocument();
  });
  it('should convert UNIX time to locale time', async () => {
    render(<PassesTable data={mockedPasses} />);
    debug();
    await waitFor(() => screen.getByRole('table'));

    const passUnixTime = mockedPasses[0].startUTC;
    const passLocaleString = moment.unix(passUnixTime).toLocaleString();
    expect(screen.queryByText(passLocaleString)).toBeInTheDocument();
  });
  it(`should add class on table footer if there are fewer than ${PASSES_PER_ROW} passes`, async () => {
    const { container } = render(<PassesTable data={mockedPasses} />);
    await waitFor(() => screen.getByRole('table'));
    const tableFooter = container.getElementsByClassName(
      'passes-table__footer'
    );

    expect(tableFooter[0]).toHaveClass('passes-table__footer--hidden');
  });
  it(`should not add class on table footer if there are more than ${PASSES_PER_ROW} passes`, async () => {
    const { container } = render(
      <PassesTable
        data={[
          ...mockedPasses,
          ...mockedPasses,
          ...mockedPasses,
          ...mockedPasses,
          ...mockedPasses,
          ...mockedPasses,
        ]}
      />
    );
    await waitFor(() => screen.getByRole('table'));
    const tableFooter = container.getElementsByClassName(
      'passes-table__footer'
    );

    expect(tableFooter[0]).not.toHaveClass('passes-table__footer--hidden');
  });
});
