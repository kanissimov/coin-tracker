import * as types from '../actions/types';

const initialState = [
  {
    symbol: 'BTC',
    quantity: 0.5,
  },
  {
    symbol: 'ETH',
    quantity: 1,
  },
  {
    symbol: 'LTC',
    quantity: 2,
  },
];

export default function(state = initialState, action) {
  const { symbol, quantity } = (action.payload || {});
  const index = state.findIndex(e => e.symbol === symbol);

  switch (action.type) {

    case types.ADD_HOLDING:
      return index >= 0
        ? [ ...state.slice(0, index),
            { symbol, quantity:  state[index].quantity + quantity },
            ...state.slice(index + 1)
          ] : [ ...state, action.payload ];

    case types.UPDATE_HOLDING:
      return index >= 0
        ? [ ...state.slice(0, index),
            { symbol, quantity },
            ...state.slice(index + 1)
          ] : [ ...state, action.payload ];

    case types.REMOVE_HOLDING:
      return state.filter(e => e.symbol !== symbol);

    default:
      return state;
  }
}
