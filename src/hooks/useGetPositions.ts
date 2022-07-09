export const useGetPositions = () => {
  return {
    get: async () => {
      return await fetch('/api/positions');
    },
  };
};
