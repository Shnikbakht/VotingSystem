## Voting System Blockchain Application

This project implements a decentralized voting system using Ethereum blockchain technology. It allows users to vote for candidates and tracks the voting results immutably on the blockchain.

## Features

- **Voting**: Users can cast their votes for different candidates.
- **Candidate Management**: Admins can add new candidates to the ballot.
- **Event Listening**: Real-time event listener for capturing and logging vote transactions.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- Hardhat (Ethereum development environment)
- Infura Project ID for Sepolia
- Deployed Contract Address (on the Ethereum network)
- Private Key for contract deployment and interaction

## Installation

Clone the repository:

```sh
git clone https://github.com/Shnikbakht/VotingSystem.git
```

## Install dependencies:

```sh
npm install
```

## Set up environment variables:

Create a .env file in the root directory and add the following:

```sh
INFURA_PROJECT_ID=your_infura_project_id
DEPLOYED_CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key_without_0x_prefix
```

Replace your_infura_project_id, your_contract_address, and your_private_key_without_0x_prefix with your actual Infura project ID, deployed contract address, and private key respectively.

## Deployment

To compile and deploy the smart contract to the Sepolia network:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Replace sepolia with your desired Ethereum network if different.

## Event Listening

Start listening for VoteCast events emitted by the deployed contract on the Sepolia network:
`sh npx hardhat run scripts/listen.js --network sepolia`
This command sets up an event listener to monitor and log new vote transactions.

## Contract Interaction

To interact with the deployed contract (e.g., adding candidates or querying vote counts):
npx hardhat run scripts/interact.js --network sepolia
Modify scripts/interact.js to include specific contract interaction functionalities as needed.

## Project Structure

contracts/: Solidity smart contract files.

ignition/modules/: Deployment (deploy.js), event listening (listen.js), and contract interaction (interact.js) scripts.

artifacts/: Compiled contract JSON files.

README.md: Project documentation.

## Contributing

Feel free to contribute to this project by creating issues or pull requests. Any feedback or feature requests are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
