import Web3 from 'web3';
import Config from 'config';

let web3 = (window as any).web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(Web3.givenProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(Config.provider));
}

const tokenContract: any = getContract(Config.Token.abi, Config.Token.address);
const orchestratorContract: any = getContract(Config.Orchestrator.abi, Config.Orchestrator.address);
const poolContract: any = getContract(Config.Pool.abi, Config.Pool.address);

const memeTokenContract: any = getContract(Config.MemeToken.abi, Config.MemeToken.address);
const uniTokenContract: any = getContract(Config.UniToken.abi, Config.UniToken.address);
const uniLpTokenContract: any = getContract(Config.UniLpToken.abi, Config.UniLpToken.address);
const wethTokenContract: any = getContract(Config.WethToken.abi, Config.WethToken.address);

const pool1Contract: any = getContract(Config.Pool1.abi, Config.Pool1.address);
const pool2Contract: any = getContract(Config.Pool2.abi, Config.Pool2.address);
const pool3Contract: any = getContract(Config.Pool3.abi, Config.Pool3.address);

/**
 * Common Contract Functions
 */
function getContract(abi: any, address: string) {
  return new web3.eth.Contract(abi, address);
}

async function getAccount(): Promise<string | undefined> {
  await web3.eth.currentProvider.enable();
  const accounts = await web3.eth.getAccounts();
  return accounts ? accounts[0] : undefined;
}

async function getBalance(contract: any, address?: string): Promise<number> {
  const _address = address || getAccount();
  const result = await contract.methods.balanceOf(_address).call();
  return parseInt(result);
}

async function getTotalSupply(contract: any,): Promise<number> {
  const result = await contract.methods.totalSupply().call();
  return parseInt(result);
}

async function rebase(from: string) {
  await orchestratorContract.methods.rebase().send({ from, gas: 900000 })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

function promisify(fn: (cb: any) => any): Promise<any> {
  return new Promise((resolve, reject) => {
      fn((err: any, result: any) => {
          if (err) {
              return reject(err);
          }

          resolve(result);
      });
  });
}

async function transferToken(amount: number, to: string): Promise<void> {
  await promisify((f) => tokenContract.transfer(amount, to, f));
}

async function approve(contract: any, address: string, from: string) {
  const max = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  await contract.methods.approve(address, max).send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function allowance(contract: any, owner: string, spender: string) {
  const result = await contract.methods.allowance(owner, spender).call();
  return result;
}

async function totalStaked() {
  const result = await poolContract.methods.totalStaked().call();
  return result;
}

async function totalStakedFor(address: string) {
  const result = await poolContract.methods.totalStakedFor(address).call();
  return result;
}

async function totalLocked() {
  const result = await poolContract.methods.totalLocked().call();
  return result;
}

async function totalUnlocked() {
  const result = await poolContract.methods.totalUnlocked().call();
  return result;
}

async function stake(amount: number, from: string) {
  await poolContract.methods.stake(amount, '0x40').send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function unstake(amount: number, from: string) {
  await poolContract.methods.unstake(amount, '0x40').send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

/**
 * StakingRewards Pool Contract Functions
 */
function precision(a: number) {
  if (!isFinite(a)) return 0;
  var e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}
async function poolStake(contract: any, amount: number, tokenDecimals: number, from: string) {
  const precision_ = precision(amount);
  const amount_ = Web3.utils.toBN(amount * 10 ** precision_);
  const pow_ = Web3.utils.toBN(10 ** (tokenDecimals - precision_));
  await contract.methods.stake(amount_.mul(pow_)).send({ from, gas: 200000 })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolWithdraw(contract: any, amount: number, tokenDecimals: number, from: string) {
  const precision_ = precision(amount);
  const amount_ = Web3.utils.toBN(amount * 10 ** precision_);
  const pow_ = Web3.utils.toBN(10 ** (tokenDecimals - precision_));
  await contract.methods.withdraw(amount_.mul(pow_)).send({ from, gas: 200000 })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolHarvest(contract: any, from: string) {
  await contract.methods.getReward().send({ from, gas: 200000 })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolExit(contract: any, from: string) {
  await contract.methods.exit().send({ from, gas: 200000 })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolGetEarned(contract: any, address: string): Promise<number> {
  const result = await contract.methods.earned(address).call();
  return result;
}

async function poolGetPeriodFinish(contract: any): Promise<Date> {
  const periodFinish = await contract.methods.periodFinish().call();
  return new Date(parseInt(periodFinish) * 1000);
}

async function poolGetRewardRate(contract: any): Promise<number> {
  const result = await contract.methods.rewardPerToken().call();
  return result;
}

export default {
  getContract,
  getAccount,
  getBalance,
  getTotalSupply,
  rebase,
  allowance,
  approve,
  totalStaked,
  totalStakedFor,
  totalLocked,
  totalUnlocked,
  stake,
  unstake,
  // Yield farming pool
  poolStake,
  poolWithdraw,
  poolHarvest,
  poolExit,
  poolGetEarned,
  poolGetPeriodFinish,
  poolGetRewardRate,
  // Utils
  promisify,
  transferToken,
  // Contracts
  tokenContract,
  orchestratorContract,
  uniTokenContract,
  memeTokenContract,
  uniLpTokenContract,
  wethTokenContract,
  pool1Contract,
  pool2Contract,
  pool3Contract,
  poolContract,
};
