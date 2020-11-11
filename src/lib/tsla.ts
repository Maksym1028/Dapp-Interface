import axios from 'axios';

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API_URL = 'https://www.tipranks.com/api/stocks';

const getTslaPrice = async () => {
  const response = await axios({
    url: `${PROXY}${API_URL}/getData?name=tsla`,
    method: 'GET',
  });
  return response.data.prices[response.data.prices.length - 1].p;
  
};

export default {
  getTslaPrice,
};
