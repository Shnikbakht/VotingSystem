require('dotenv').config();
const { Web3 } = require('web3');
const fs = require('fs');

// Check if environment variables are set
if (!process.env.INFURA_PROJECT_ID || !process.env.DEPLOYED_CONTRACT_ADDRESS) {
  console.error('Please set INFURA_PROJECT_ID and DEPLOYED_CONTRACT_ADDRESS in your .env file');
  process.exit(1);
}
// Initialize Web3 with Infura WebSocket endpoint for Sepolia
const web3 = new Web3(`wss://sepolia.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);

// Read the compiled contract JSON file
const contractJSON = JSON.parse(fs.readFileSync('./artifacts/contracts/VotingSystem.sol/VotingSystem.json', 'utf8'));
const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;

// Log contract ABI for verification
console.log('Contract ABI:', contractJSON.abi);

// Create contract instance
const contract = new web3.eth.Contract(contractJSON.abi, contractAddress);

// Log contract instance to verify creation
//console.log('Contract Instance:', contract);

console.log('Listening for VoteCast events...');

try {
  if (contract.events && contract.events.VoteCast) {
    contract.events
      .VoteCast({
        fromBlock: 'latest',
      })
      .on('data', (event) => {
        console.log('New vote cast:');
        console.log('Voter:', event.returnValues.voter);
        console.log('Candidate:', event.returnValues.candidate);
        console.log('Block Number:', event.blockNumber);
        console.log('Transaction Hash:', event.transactionHash);
      })
      // .on('error', (error) => {
      //   console.error('Error in event listener:', error);
      // });
  } else {
    console.error('VoteCast event is undefined. Check if the event exists in your contract ABI.');
  }
} catch (error) {
  console.error('Error setting up event listener:', error);
}

// Keep the script running
process.stdin.resume();
