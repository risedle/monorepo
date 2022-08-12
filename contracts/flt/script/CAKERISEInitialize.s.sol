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

contract InitializeCAKERISE is Script, BaseSinglePair {
    using FixedPointMathLib for uint256;

    function getData() internal override returns (Data memory _data) {}

    function run() public {
        address CAKERISE = 0x85c3DE1e3BAC44Fbbb0EFc27C28dE2EBF83E93F9;
        address BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
        uint256 ca = 100 ether; // 100 CAKE
        (uint256 td, uint256 s, uint256 ts) = getInitializationParams(
            CAKERISE,
            ca,
            2 ether,
            0.1 ether
        );
        uint256 slippage = 0.01 ether; // 1%
        uint256 sendAmount = s + slippage.mulWadDown(s);

        // Transfer BUSD to contract
        vm.startBroadcast();
        ERC20(BUSD).transfer(CAKERISE, sendAmount);
        FLT(CAKERISE).initialize(ca, td, ts);
    }
}
