import { useState, useEffect } from 'react';

const useDataState = () => {
  const [credit, setCredit] = useState(0.00);
  const [change, setChange] = useState(0.00);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setChange(credit - selectedProduct.price);
    }
  // eslint-disable-next-line
  }, [selectedProduct]);

  return {
    state: {
      credit,
      change,
      selectedProduct,
    },
    func: {
      setCredit,
      setChange,
      setSelectedProduct,
    }
  }
}

export default useDataState;
