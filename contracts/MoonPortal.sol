// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MoonPortal {
    uint256 totalPosts;

    /*
     * We will be using this below to help generate a random number
     */
    uint256 private seed;

    event NewPost(
        address indexed from,
        uint256 timestamp,
        string message,
        bool winner
    );

    struct Post {
        address poster;
        string message;
        uint256 timestamp;
        bool winner;
    }

    Post[] posts;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user posted to us.
     */
    mapping(address => uint256) public lastPostedAt;

    constructor() payable {
        /*
         * Set the initial seed
         */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function post(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-seconds bigger than the last timestamp we stored
         */
        require(
            lastPostedAt[msg.sender] + 15 seconds < block.timestamp,
            "Wait 15m"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastPostedAt[msg.sender] = block.timestamp;

        totalPosts += 1;
        console.log("%s has posted!", msg.sender);

        /*
         * Generate a new seed for the next user that sends a post
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        bool winner = seed <= 50;

        posts.push(Post(msg.sender, _message, block.timestamp, winner));
        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (winner) {
            console.log("%s won!", msg.sender);

            /*
             * The same code we had before to send the prize.
             */
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewPost(msg.sender, block.timestamp, _message, winner);
    }

    function getAllPosts() public view returns (Post[] memory) {
        return posts;
    }

    function getTotalPosts() public view returns (uint256) {
        return totalPosts;
    }
}
