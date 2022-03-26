// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Base is ERC20 {
    constructor() ERC20("Base", "BASE") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}
