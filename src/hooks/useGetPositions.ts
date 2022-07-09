export const useGetPositions = () => {
  return {
    get: async () => {
      return await (await fetch('/api/positions')).json();
    },
  };
};
