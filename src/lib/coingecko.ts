import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

const getMemePrice = async () => {
  const response = await axios({
    url: `${API_URL}/simple/price?ids=degenerator&vs_currencies=USD`,
    method: 'GET',
  });
  return response.data.degenerator.usd;
};

const getUniPrice = async () => {
  const response = await axios({
    url: `${API_URL}/simple/price?ids=uniswap&vs_currencies=USD`,
    method: 'GET',
  });
  return response.data.uniswap.usd;
}

const getYtslaPrice = async () => {
  const response = await axios({
    url: `${API_URL}/simple/price?ids=ytsla-finance&vs_currencies=USD`,
    method: 'GET',
  });
  return response.data['ytsla-finance'].usd;
}

const getEthPrice = async () => {
  const response = await axios({
    url: `${API_URL}/simple/price?ids=ethereum&vs_currencies=USD`,
    method: 'GET',
  });
  return response.data['ethereum'].usd;
}

export default {
  getMemePrice,
  getUniPrice,
  getYtslaPrice,
  getEthPrice,
};
