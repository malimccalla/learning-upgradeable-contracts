// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract Base is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    string public title;
    // Constructor functions can not be used in upgradeable contracts
    // Instead we can use an initialize functions with the initalizer modifier
    function initialize(string memory _title) public initializer {
        // As this is not a standard contrctor function we can use this funny syntax
        // to pass the arguments to what would have been our ERC20("Base", "BASE") constructor syntax
        __ERC20_init("Base", "BASE");

        // We also need to manually inialize the ownable contract we inherit from
        // Without this the owner variable would not be initalized and the upgrade function
        // Would not be able to run as _authorizeUpgrade requires onlyOwner
        __Ownable_init();

        title = _title;

        _mint(msg.sender, 10000000 * 10 ** decimals());
    } 

    // We are foced to write this function ourself for UUPS upgradeable
    // functions as we need to explicityly say how we want to authorize upgrades 
    function _authorizeUpgrade(address) internal override onlyOwner {}
}

// To make a v2 of our contract we extend v2. This gives us all the functionailty of v1
// but with the ability to add new functions
contract BaseV2 is Base {
    uint public fee;

    // We know that we will want to change this function in the future so we mark
    // it as 'virtual'. This allows us to override it with the 'override' keyword
    function version() public pure virtual returns (string memory) {
        return "v2";
    }
}

// In version 3 we should extend v2. 
contract BaseV3 is BaseV2 {
    uint public tax;

    // At this point the function should be both virtual and override
    function version() public pure override virtual returns (string memory) {
        return "v3";
    }
}