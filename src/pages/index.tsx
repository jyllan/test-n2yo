import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useGetPositions } from '@/hooks/useGetPositions';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { SatellitePosition } from '@/types/SatellitePosition';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  const getPositions = useGetPositions().get;
  const [positions, setPositions] = useState<SatellitePosition[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onClick = useCallback(async () => {
    setIsLoading(true);
    const data = await getPositions();
    setIsLoading(false);
    if (data) {
      setPositions(data);
    } else {
      setHasError(true);
    }
  }, [getPositions]);

  useEffect(() => {
    if (isLoading) {
      setHasError(false);
      setPositions(undefined);
    }
  }, [isLoading]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center  '>
            <h1 className='mt-4'>Locate Galileo satellites</h1>
            <Button onClick={onClick} variant='primary' className='mt-6'>
              Display Galileo satellites position
            </Button>
            {isLoading && (
              <div className='loading mt-6 flex justify-center'>Loading...</div>
            )}
            {hasError && (
              <div className='loading mt-6 flex justify-center'>
                An error occured, please retry
              </div>
            )}
            {!isLoading && positions && (
              <div className='positions mt-6 flex justify-center'>
                {positions.map((position) => {
                  return position.name;
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
