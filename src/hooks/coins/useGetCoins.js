import { useState } from 'react';

const useGetCoins = ({ service }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getCoins = async () => {
    try {
      const data = await service.getCoins();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };
  
  return [
    {
      data,
      error
    },
    getCoins
  ]
};

export default useGetCoins;
