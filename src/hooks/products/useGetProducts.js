import { useState } from 'react';

const useGetProducts = ({ service }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const data = await service.getProducts();
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
    getProducts
  ]
};

export default useGetProducts;
