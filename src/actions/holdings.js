import * as types from './types';

export const addHolding = ({ symbol, quantity }) => (
  { type: types.ADD_HOLDING, payload: { symbol, quantity }}
);

export const updateHolding = ({ symbol, quantity }) => (
  { type: types.UPDATE_HOLDING, payload: { symbol, quantity }}
);

export const removeHolding = (symbol) => (
  { type: types.REMOVE_HOLDING, payload: { symbol } }
);
