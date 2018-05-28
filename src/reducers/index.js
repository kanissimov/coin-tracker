import { combineReducers } from 'redux';
import holdings from './holdings';
import coins from './coins';
import prices from './prices';

export default combineReducers({
  holdings,
  coins,
  prices,
});
