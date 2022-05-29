import * as types from '../constants';
import { products } from '../mockData/products';

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

export const purchaseProduct = (product, credit) => {
  console.log(product);
  const { currency, price } = product;

  return new Promise((resolve, reject) => {
    if (currency !== types.CURRENCY) {
      reject({
        errorCode: 'COIN-001',
        message: 'Invalid currency'
      });
    }

    if (price > credit) {
      reject({
        errorCode: 'PAYMENT-001',
        message: 'Insufficient money'
      });
    }
   
    resolve(product);
  });
};
