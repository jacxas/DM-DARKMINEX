// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract DarkMineDAO is ERC20Votes {

    constructor()
        ERC20("DM DARKMINE","DM")
        ERC20Permit("DM DARKMINE")
    {
        _mint(msg.sender,1000000000 * 10**18);
    }
}
