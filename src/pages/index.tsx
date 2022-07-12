import * as React from 'react';
import { useCallback, useState } from 'react';

import { useGetSatellitesData } from '@/hooks/useGetSatellitesData';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import SatellitesTable from '@/components/SatellitesTable';
import Seo from '@/components/Seo';

import { SatelliteData } from '@/types/SatellitesData';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  const getSatellitesData = useGetSatellitesData().get;
  const [satellitesData, setSatellitesData] = useState<
    SatelliteData[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onClick = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setSatellitesData(undefined);
    try {
      const data = await getSatellitesData();
      if (data) {
        setSatellitesData(data);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  }, [getSatellitesData]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className='page-index bg-white'>
          <div className='layout flex  flex-col items-center  '>
            <h1 className='mt-4'>Locate Galileo satellites</h1>
            <Button
              onClick={onClick}
              className='load-button mt-6'
              variant='primary'
            >
              Display Galileo satellites position
            </Button>
          </div>
          <div className='flex justify-center'>
            {isLoading && <div className='loading mt-6'>Loading...</div>}
            {hasError && (
              <div className='loading mt-6'>An error occured, please retry</div>
            )}
            {!isLoading && satellitesData && (
              <SatellitesTable data={satellitesData} />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
