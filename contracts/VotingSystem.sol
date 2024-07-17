// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VotingSystem
 * @dev A smart contract for decentralized voting system.
 * @author Shahla Nikbakht
 */
contract VotingSystem {
    mapping(address => bool) private hasVoted;
    mapping(string => uint256) public voteCount;
    uint256 public totalVotes;

    event VoteCast(address indexed voter, string candidate);

    /**
     * @dev Allows a voter to cast a vote for a candidate.
     * @param candidate The name of the candidate being voted for.
     */
    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;
        voteCount[candidate]++;
        totalVotes++;
        emit VoteCast(msg.sender, candidate);
    }

    /**
     * @dev Adds a new candidate to the ballot.
     * @param candidate The name of the candidate to add.
     */
    function addCandidate(string memory candidate) public {
        require(voteCount[candidate] == 0, "Candidate already exists.");
        voteCount[candidate] = 0;
    }

    /**
     * @dev Retrieves the vote count for a specific candidate.
     * @param candidate The name of the candidate to query.
     * @return The number of votes received by the candidate.
     */
    function getVoteCount(
        string memory candidate
    ) public view returns (uint256) {
        return voteCount[candidate];
    }

    /**
     * @dev Resets the vote of the caller.
     */
    function _resetVote(address voter) private {
        if (hasVoted[voter]) {
            hasVoted[voter] = false;
            totalVotes--;
        }
    }

    /**
     * @dev Allows the caller to reset their vote.
     */
    function resetMyVote() public {
        _resetVote(msg.sender);
    }
}
