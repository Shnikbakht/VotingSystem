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
cd voting-system

Install dependencies:

npm install
Set up environment variables
Create a .env file in the root directory and add the following:

INFURA_PROJECT_ID=your_infura_project_id
DEPLOYED_CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key_without_0x_prefix

```
