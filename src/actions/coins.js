import * as types from './types';
import { coinsMetaData } from '../services/cryptoCompare';
import { COINS } from '../constants';

export const fetchMeta = () => async dispatch => {
  const coins = await coinsMetaData(COINS);
  // console.table(coins);
  dispatch({ type: types.FETCH_META_SUCCESS, payload: coins });
}
