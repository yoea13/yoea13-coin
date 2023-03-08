//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Yoea13 is ERC20 {
    uint constant _initial_supply = 1000000 * (10 ** 18);

    constructor() ERC20("Yoea13", "YOEA13") {
        _mint(msg.sender, _initial_supply);
    }
}
