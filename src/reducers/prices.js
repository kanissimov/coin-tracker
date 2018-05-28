import * as types from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.FETCH_PRICES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
