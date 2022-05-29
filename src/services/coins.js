import * as types from '../constants';
import { coins } from '../mockData/coins';

export const getCoins = () => {
  return new Promise((resolve, reject) => {
    resolve(coins);
  });
};

export const addCoin = (coin, existingCredit = 0) => {
  const { currency, value } = coin;

  return new Promise((resolve, reject) => {
    if (currency !== types.CURRENCY) {
      reject({
        errorCode: 'COIN-001',
        message: 'Invalid currency'
      });
    }


    if (!types.VALID_DEMONINATIONS.includes(value)) {
      reject({
        errorCode: 'COIN-002',
        message: 'Invalid denomination'
      });
    }

    if (existingCredit >= types.MOST_EXPENSIVE_PRODUCT_VALUE) {
      reject({
        errorCode: 'COIN-003',
        message: 'Too much money'
      });
    }

    resolve(coin);
  });
};
