// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Base is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    // Constructor functions can not be used in upgradeable contracts
    // Instead we can use an initialize functions with the initalizer modifier
    function initialize() public initializer {
        // As this is not a standard contrctor function we can use this funny syntax
        // to pass the arguments to what would have been our ERC20("Base", "BASE") constructor syntax
        __ERC20_init("Base", "BASE");
        _mint(msg.sender, 10000000 * 10 ** decimals());
    } 

    // We are foced to write this function ourself for UUPS upgradeable
    // functions as we need to explicityly say how we want to authorize upgrades 
    function _authorizeUpgrade(address) internal override onlyOwner {}
}

// To make a v2 of our contract we extend v2. This gives us all the functionailty of v1
// but with the ability to add new functions
contract BaseV2 is Base {
    function version() public pure returns (string memory) {
        return "v2";
    }
}