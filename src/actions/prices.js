import * as types from './types';
import { coinsPrices } from '../services/cryptoCompare';
import { COINS } from '../constants';

export const fetchPrices = () => async dispatch => {
  const prices = await coinsPrices(COINS);
  // console.table(prices);
  dispatch({ type: types.FETCH_PRICES_SUCCESS, payload: prices });
}
