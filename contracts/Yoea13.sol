//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Goerli deployed 0x052258F87f85CC550DcAba8fb0dB65b03f84e3f5

contract Yoea13 is ERC20 {
    uint constant _initial_supply = 1000000 * (10 ** 18);

    constructor() ERC20("Yoea13", "YOEA13") {
        _mint(msg.sender, _initial_supply);
    }
}
