import axios from 'axios';
import Config from 'config';
import web3client from './web3client';
import coingecko from './coingecko';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaXNzIjoiZGV4dG9vbHMuaW8iLCJzdWIiOiJhbnlvbmUiLCJyZWYiOiI1MC43LjE1OS4zNCIsImlhdCI6MTU5OTQ5MjEzMH0.VKcBB6v3pspBu4QMzQIk5nV5MGZHoAKDG4Hhkv5dC1E';
const API_URL = 'https://www.dextools.io/api';
const PROXY = 'https://cors-anywhere.herokuapp.com/'


const getEthPrice = async () => {
  const response = await axios({
    method: 'GET',
    url: `${PROXY}${API_URL}/common/ethPrice`,
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  });
  if (response.data.message !== 'OK') return 0;
  return response.data.result.ethusd;
}

const getTokenPrice = async () => {
  const response = await axios({
    url: `${PROXY}${API_URL}/uniswap/pool?pairSelected=${Config.Uniswap.address}`,
    method: 'GET',
    headers: {
      authorization: `Bearer ${API_KEY}`,
    }
  });
  const rate = response.data.data.pair.reserve1 / response.data.data.pair.reserve0;
  const ethPrice = await getEthPrice();
  return rate * ethPrice;
};

const getLpTokenPrice = async () => {
  /*try {
    const response = await axios({
      url: `${PROXY}${API_URL}/uniswap/pool?pairSelected=${Config.Uniswap.address}`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${API_KEY}`,
      }
    });
    const ethPrice = await getEthPrice();
    const totalSupply = await web3client.getTotalSupply(web3client.uniLpTokenContract);
    return ethPrice * response.data.data.pair.reserve1 / (totalSupply / Math.pow(10, Config.UniLpToken.decimals));
  } catch(err) {
    return 137.55;
  }*/
  const totalSupply = await web3client.getTotalSupply(web3client.uniLpTokenContract);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.UniLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return ethPrice * wethBalance / totalSupply;
}

export default {
  getTokenPrice,
  getEthPrice,
  getLpTokenPrice,
};
