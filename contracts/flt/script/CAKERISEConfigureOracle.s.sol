// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

import { IRariFusePriceOracleAdapter } from "src/adapters/IRariFusePriceOracleAdapter.sol";

contract ConfigureCAKEOracle is Script {
    function run() public {
        IRariFusePriceOracleAdapter oracle = IRariFusePriceOracleAdapter(
            0x88888885EAf9c96B31b5a55CAF3173Fc6eb14ca6
        );
        address rariOracle = 0xB641c21124546e1c979b4C1EbF13aB00D43Ee8eA;
        address token = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;

        vm.startBroadcast();
        oracle.configure(token, rariOracle, 18);
    }
}
