import { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Payment from '../components/Payment';
import Products from '../components/Products';

import useDataContext from '../context/useDataContext';
import useGetCoins from "../hooks/coins/useGetCoins";
import useAddCoin from "../hooks/coins/useAddCoin";
import useGetProducts from "../hooks/products/useGetProducts";
import usePurchaseProduct from "../hooks/products/usePurchaseProduct";

import * as coinService from '../services/coins';
import * as productsService from '../services/products';

const Container = styled.div`
  box-sizing: border-box;
  border: 3px solid #333;
  border-radius: 4px;
  margin: 40px auto;
  width: 800px;
  display: grid;
  grid-template-areas: 'header header' 'error error' 'payment products';
  background: #f3edd7;
`;

const ErrorContainer = styled.div`
  grid-area: error;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  span {
    font-size: 20px;
  }
`;

const VendingMachine = () => {
  const {
    state: { credit, change, selectedProduct },
    func: { setCredit, setChange, setSelectedProduct }
  } = useDataContext();
  const [
    { data: coins, error: isCoinsError },
    getCoins
  ] = useGetCoins({ service: coinService });
  const [
    { data: products, error: isProductsError },
    getProducts
  ] = useGetProducts({ service: productsService });
  const addCoin = useAddCoin({ service: coinService });
  const purchaseProduct = usePurchaseProduct({ service: productsService });

  const resetData = () => {
    setCredit(0.00);
    setChange(0.00);
    setSelectedProduct(null);
  };

  const handleAddCoin = async(coin) => {
    const {
      data: addCoinSuccessData,
      error: addCoinErrorData
    } = await addCoin(coin, credit);

    if (addCoinSuccessData) {
      setCredit((c) => c + addCoinSuccessData.value);
    }

    if (addCoinErrorData) {
      alert(JSON.stringify(addCoinErrorData));
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handlePurchaseProduct = async () => {
    const {
      data: purchaseSuccessData,
      error: purchaseErrorData
    } = await purchaseProduct(selectedProduct, credit);

    if (purchaseSuccessData) {
      alert(`
        Successfully purchased!
        Your change is $${change.toFixed(2)}
      `);
      resetData();
    }
    
    if (purchaseErrorData) {
      alert(JSON.stringify(purchaseErrorData));
    }
  };

  useEffect(() => {
    getCoins();
    getProducts();
  // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Header />
      {(isCoinsError || isProductsError) ? (
        <ErrorContainer>
          <span>Something went wrong!</span>
        </ErrorContainer>
      ) : (
        <>
          <Payment
            coins={coins}
            credit={credit}
            change={change}
            addCoin={handleAddCoin}
          />
          <Products
            products={products}
            credit={credit}
            selectedProduct={selectedProduct}
            selectProduct={handleSelectProduct}
            purchaseProduct={handlePurchaseProduct}
          />
        </>
      )}
    </Container>
  );
};

export default VendingMachine;
