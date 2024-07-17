require('dotenv').config();
const {Web3} = require('web3');
const fs = require('fs');

// Read the compiled contract JSON file
const contractJSON = JSON.parse(fs.readFileSync('./artifacts/contracts/VotingSystem.sol/VotingSystem.json', 'utf8'));

async function main() {
    // Check if environment variables are set
    if (
        !process.env.INFURA_PROJECT_ID ||
        !process.env.PRIVATE_KEY ||
        !process.env.DEPLOYED_CONTRACT_ADDRESS
      ) {
        console.error(
          'Please set INFURA_PROJECT_ID, PRIVATE_KEY, and DEPLOYED_CONTRACT_ADDRESS in your .env file'
        );
        process.exit(1);
      }
    
      // Initialize Web3 with Infura HTTP endpoint for Sepolia
      const web3 = new Web3(
        `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      );
    
      // Remove '0x' prefix if it exists
      const privateKey = process.env.PRIVATE_KEY.startsWith('0x')
        ? process.env.PRIVATE_KEY.slice(2)
        : process.env.PRIVATE_KEY;
    
      // Create account object from private key
      const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);    

    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // Create contract instance
    const votingSystem = new web3.eth.Contract(contractJSON.abi, process.env.DEPLOYED_CONTRACT_ADDRESS);

    // Add a candidate
    console.log('Adding Candidate1...');
    await votingSystem.methods.addCandidate('Candidate1').send({from: account.address});
    console.log('Added Candidate1');

    // Vote for a candidate
    console.log('Voting for Candidate1...');
    await votingSystem.methods.vote('Candidate1').send({from: account.address});
    console.log('Voted for Candidate1');

    // Get vote count
    const voteCount = await votingSystem.methods.getVoteCount('Candidate1').call();
    console.log('Candidate1 vote count:', voteCount);

    // Get total votes
    const totalVotes = await votingSystem.methods.totalVotes().call();
    console.log('Total votes:', totalVotes);

    // Reset vote
    console.log('Resetting vote...');
    await votingSystem.methods.resetMyVote().send({from: account.address});
    console.log('Reset vote');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });