// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {

    function transfer(address to,uint256 amount)
        external
        returns(bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    )
        external
        returns(bool);
}

contract DarkMineStaking {

    IERC20 public token;

    uint256 public rewardRate = 12;

    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => StakeInfo) public stakes;

    constructor(address _token){
        token = IERC20(_token);
    }

    function stake(uint256 amount) external {

        token.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        stakes[msg.sender].amount += amount;

        stakes[msg.sender].timestamp =
            block.timestamp;
    }

    function unstake() external {

        StakeInfo storage user =
            stakes[msg.sender];

        uint256 stakingTime =
            block.timestamp - user.timestamp;

        uint256 reward =
            (user.amount * rewardRate * stakingTime)
            / (365 days * 100);

        uint256 payout =
            user.amount + reward;

        user.amount = 0;

        token.transfer(msg.sender,payout);
    }
}
