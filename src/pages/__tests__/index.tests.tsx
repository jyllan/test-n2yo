import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { debug } from 'jest-preview';

import * as useGetSatellitesDataHooks from '@/hooks/useGetSatellitesData';

import {
  mockedPasses,
  mockedSatellitePassesInfo,
  mockedSatellitesData,
} from '@/mocks/data';
import HomePage from '@/pages/index';

import { SatelliteData } from '@/types/SatellitesData';

jest.mock('@/components/Seo');

let useGetSatellitesDataSpy: jest.SpyInstance;

describe(`Given 'HomePage' page is rendered`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGetSatellitesDataSpy = jest.spyOn(
      useGetSatellitesDataHooks,
      'useGetSatellitesData'
    );
  });
  it('Should display the title and a button', async () => {
    render(<HomePage />);
    await waitFor(() => screen.getByRole('heading'));
    expect(screen.queryByRole('heading')).toHaveTextContent(
      'Locate Galileo satellites'
    );
    const button = screen.queryByText('Display Galileo satellites position', {
      selector: 'button',
    });

    expect(button).toBeInTheDocument();
  });

  describe(`and the button is not clicked`, () => {
    it('should not render the table', async () => {
      render(<HomePage />);
      await waitFor(() => screen.getByRole('heading'));
      expect(screen.queryByRole('table')).toBeNull();
    });
  });

  describe(`and the button is clicked`, () => {
    it('should render the main table and a sub table', async () => {
      useGetSatellitesDataSpy.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockedSatellitesData),
      });
      render(<HomePage />);
      await waitFor(() => screen.getAllByRole('heading'));
      const button = screen.getByText('Display Galileo satellites position', {
        selector: '.load-button',
      });
      expect(button).toBeInTheDocument();
      expect(
        screen.queryByText(mockedSatellitePassesInfo.satname)
      ).not.toBeInTheDocument();
      fireEvent.click(button);
      debug();
      await waitFor(() => screen.getByText(mockedSatellitePassesInfo.satname));
      expect(screen.queryByText(mockedPasses[0].startUTC)).toBeInTheDocument();
      expect(screen.queryByText(mockedPasses[1].startUTC)).toBeInTheDocument();
    });

    describe(`and the fetch is still pending`, () => {
      it(`should display a loading message while it's loading then display the table`, async () => {
        jest.useFakeTimers();
        useGetSatellitesDataSpy.mockReturnValue({
          get: jest.fn().mockImplementation(() => {
            return new Promise<SatelliteData[]>((resolve) => {
              setTimeout(() => {
                resolve(mockedSatellitesData);
              }, 1000);
            });
          }),
        });
        render(<HomePage />);

        await waitFor(() => screen.getAllByRole('heading'));
        const button = screen.getByText('Display Galileo satellites position', {
          selector: '.load-button',
        });
        expect(button).toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(
          screen.queryByText(mockedSatellitePassesInfo.satname)
        ).not.toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
        jest.runAllTimers();
        await waitFor(() =>
          screen.getByText(mockedSatellitePassesInfo.satname)
        );
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });

    describe(`and the fetch fails`, () => {
      it(`should display an error message`, async () => {
        jest.useFakeTimers();
        useGetSatellitesDataSpy.mockReturnValue({
          get: jest.fn().mockImplementation(() => {
            return new Promise<SatelliteData[]>((resolve, reject) => {
              setTimeout(() => {
                reject();
              }, 1000);
            });
          }),
        });
        render(<HomePage />);

        await waitFor(() => screen.getAllByRole('heading'));
        const button = screen.getByText('Display Galileo satellites position', {
          selector: '.load-button',
        });
        expect(button).toBeInTheDocument();
        expect(
          screen.queryByText('An error occured, please retry')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(mockedSatellitePassesInfo.satname)
        ).not.toBeInTheDocument();
        fireEvent.click(button);
        jest.runAllTimers();
        await waitFor(() => screen.getByText('An error occured, please retry'));
      });
    });
  });
});
