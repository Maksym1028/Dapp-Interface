import axios from 'axios';

const API_URL = 'https://api.etherscan.io/api';
const API_KEY = 'B3X3PCE9J11VW5HYI5PWQPAWKHXHI3ETXQ';

const getCurrentBlock = async () => {
  const response = await axios({
    method: 'GET',
    url: `${API_URL}?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`
  });
  return response.data.result;
}

const getTransactionsCount = async (address: string) => {
  console.log('a');
  const response = await axios({
    method: 'GET',
    url: `${API_URL}?module=account&action=txlist&address=${address}&sort=asc&apikey=${API_KEY}`
  });
  console.log(response.data.result.length);
  return response.data.result.length;
};

export default {
  getTransactionsCount,
};
