import axios from "axios";

const API_KEY = process.env.REACT_APP_STOCK_EXCHANGE_API_KEY;
export async function grabStocksFromApi(searchInput) {
  const response = await axios.get(
    `https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
  );
  const data = await response.data;
  return data;
}

export async function getStockDetails(individualCompany) {
  individualCompany["details"] = [];

  const response = await axios.get(
    `https://financialmodelingprep.com/api/v3/company/profile/${individualCompany.symbol}?apikey=${API_KEY}`
  );
  individualCompany.details = response.data.profile;
  return individualCompany;
}

export async function grabMarqueeData() {
  const response = await axios.get(
    `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=${API_KEY}`
  );
  const marqueeData = await response.data.stockList.slice(0, 70);
  return marqueeData;
}

export async function getCompanyHistory(symbol) {
  const response = await axios.get(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`
  );
  const historicalData = response.data;
  return historicalData;
}
