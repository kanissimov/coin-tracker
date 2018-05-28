import axios from 'axios';
import { TARGET_CURRENCY } from '../constants';

export const coinsMetaData = async (coins) => {
  const url = 'https://min-api.cryptocompare.com/data/all/coinlist';

  const response = await axios.get(url);
  const { Data: data, BaseImageUrl: baseImageUrl } = response.data;
  const result = coins.reduce((acc, coin) => {
    if (data[coin]) {
      const { CoinName: name, ImageUrl: image } = data[coin];
      acc[coin] = { name, icon: `${baseImageUrl}${image}`};
    }
    return acc;
  }, {});
  // console.log(result);
  return result;
};

export const coinsPrices = async (coins) => {
  const params = `fsyms=${coins.join(',')}&tsyms=${TARGET_CURRENCY}`;
  const url = `https://min-api.cryptocompare.com/data/pricemulti?${params}`;

  const response = await axios.get(url);
  const { data } = response;
  const result = Object.keys(data).reduce((acc, k) => (
    { ...acc, [k]: data[k][TARGET_CURRENCY] }
  ), {});
  return result;
}
