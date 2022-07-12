import { getOrbitalSpeed } from '@/utils/maths';

describe(`Given 'getOrbitalSpeed' is called`, () => {
  it('should return the orbital speed, in m/s, matching the given altitude', () => {
    const v = getOrbitalSpeed(200);
    expect(v).toBe(7788.48798497);
  });
});
