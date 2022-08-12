// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import { FixedPointMathLib } from "solmate/utils/FixedPointMathLib.sol";

import { BaseSinglePair } from "test/BaseSinglePair.sol";

interface FLT {
    function initialize(
        uint256 _ca,
        uint256 _da,
        uint256 _shares
    ) external;
}

interface ERC20 {
    function transfer(address to, uint256 amount) external;
}

contract InitializeCAKEDROP is Script, BaseSinglePair {
    using FixedPointMathLib for uint256;

    function getData() internal override returns (Data memory _data) {}

    function run() public {
        address CAKEDROP = 0xc087661B92435f95fD68723412Bc5f22BBC69c24;
        address CAKE = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
        uint256 ca = 400 ether; // 400 BUSD
        (uint256 td, uint256 s, uint256 ts) = getInitializationParams(
            CAKEDROP,
            ca,
            2 ether,
            0.1 ether
        );
        uint256 slippage = 0.05 ether; // 5%
        uint256 sendAmount = s + slippage.mulWadDown(s);

        // Transfer BUSD to contract
        vm.startBroadcast();
        ERC20(CAKE).transfer(CAKEDROP, 10 ether);
        FLT(CAKEDROP).initialize(ca, td, ts);
    }
}
