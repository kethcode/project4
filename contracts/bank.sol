// SPDX-License-Identifier: mine
pragma solidity ^0.8.17;

/**
 * @title  talk-to-mevm
 * @author Kethic <kethic@kethic.com> @kethcode
 * @notice Contract for talk-to-mevm workshop
 */

contract bank {
    mapping(address => uint256) public balance;

    // deposit
    function deposit(address account) public payable {
        balance[account] += msg.value;
    }

    // withdraw
    function withdraw(address account, address destination, uint256 amount) public {
        require(msg.sender == account, "Only account owner can withdraw");
        require(balance[account] >= amount, "Insufficient funds");
        balance[account] -= amount;
        payable(destination).transfer(amount);
    }
}
