import axios from "axios";

const base_url = "https://api.coingecko.com/api/v3";
export const get_exchanges = (per_page = 100, page) =>
  `${base_url}/exchanges?per_page=${per_page}&page=${page}`;
export const get_trending = () => `${base_url}/search/trending`;
export const get_categories = () => `${base_url}/coins/categories`;
export const get_coin_price = (id) =>
  `${base_url}/simple/price?ids=${id}&vs_currencies=usd`;
export const get_coin_list = () => `${base_url}/coins/list`;
export const get_coin_data = (id) => `${base_url}/coins/${id}`;
export const get_coin_chart = (id, day) =>
  `${base_url}/coins/${id}/market_chart?vs_currency=usd&days=${day}&interval=daily`;
export const search_coins = (query) => `${base_url}/search?query=${query}`;
export const get_coins_data = (per_page, page) =>
  `${base_url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&locale=en`;
export const seatch_coins_data = (
  search = "",
  per_page = 10,
  page = 1,
  sortBy = "market_cap_desc"
) =>
  `${base_url}/coins/markets?vs_currency=${currency}&ids=${search}&order=${sortBy}&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
export async function getData(url) {
  return await axios.get(url).then((res) => {
    console.log(res.data);
    return res.data;
  });
}
