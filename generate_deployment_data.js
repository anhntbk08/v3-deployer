const { ethers } = require('ethers');

const ABI_ACCOUNT_GUARDIAN = require("./bytecodes/AccountGuardian.json")["bytecode"]["object"];

// Replace with your Ethereum provider URL
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

// Replace with the private key of the account interacting with the contract
const privateKey = 'af9911436be11001d6b3ec1cdf895490b8b4faf9ae17dead93d719c71626af07';

// Replace with your contract's address
const factoryAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c';

// Replace with the private key of the account interacting with the contract
const wallet = new ethers.Wallet(privateKey, provider);

// Replace with your contract's ABI
const factoryABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "code",
        "type": "bytes"
      },
      {
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "computeAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Create a contract instance
const factoryContract = new ethers.Contract(factoryAddress, factoryABI, wallet);

async function computeContractAddress(code, salt) {
  try {
    // Call the computeAddress function
    const computedAddress = await factoryContract.computeAddress(code, salt);
    console.log('Computed Address:', computedAddress);
    return computedAddress;
  } catch (error) {
    console.error('Error computing address:', error);
  }
}

// Example usage
const exampleCode = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('0x6003600501600060006103f8f3')); // Replace with your contract bytecode
const exampleSalt = ethers.BigNumber.from(123456); // Replace with your salt

computeContractAddress(exampleCode, exampleSalt);
