// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { RariFusePriceOracleAdapter } from "src/adapters/RariFusePriceOracleAdapter.sol";
import { FLTSinglePair } from "src/FLTSinglePair.sol";
import { FLTFactory } from "src/FLTFactory.sol";

import { BaseTest } from "test/BaseTest.sol";
import { BaseSinglePair } from "test/BaseSinglePair.sol";
import { BaseInitializeTest } from "test/BaseInitializeTest.sol";
import { BaseMintTest } from "test/BaseMintTest.sol";
import { BaseBurnTest } from "test/BaseBurnTest.sol";
import { BaseRebalanceTest } from "test/BaseRebalanceTest.sol";
import { BaseRouterTest } from "test/BaseRouterTest.sol";
import { BaseRebalancerTest } from "test/BaseRebalancerTest.sol";

/**
 * @title CAKERISE test
 * @author bayu <bayu@risedle.com> <https://github.com/pyk>
 */
contract CAKERISE is
    BaseTest,
    BaseSinglePair,
    BaseInitializeTest,
    BaseMintTest,
    BaseBurnTest,
    BaseRebalanceTest,
    BaseRouterTest,
    BaseRebalancerTest
{
    /// ███ Storages █████████████████████████████████████████████████████████

    // Risedle Multisig address on Binance
    address multisig = 0x0F12290d070b81B190fAeb07fB65b00882Cc266A;
    address rariOracle = 0xB641c21124546e1c979b4C1EbF13aB00D43Ee8eA;

    function getData() internal override returns (Data memory _data) {
        // CAKE as collateral & BUSD as debt
        address collateral = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
        address debt = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
        address WETH = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // WBNB

        RariFusePriceOracleAdapter oracle = new RariFusePriceOracleAdapter();
        oracle.configure(collateral, rariOracle, 18);
        oracle.configure(debt, rariOracle, 18);
        oracle.configure(WETH, rariOracle, 18);

        // Fuse CAKE as collateral and Fuse BUSD as debt
        address fCollateral = 0xbd163D07015ae3c0701304E20FEBAB421A2020aA;
        address fDebt = 0x1f6B34d12301d6bf0b52Db7938Fc90ab4f12fE95;

        // CAKE/BUSD Pair and router
        address pair = 0x804678fa97d91B974ec2af3c843270886528a9E6;
        address router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

        // Create new factory with multisig as fee recipient
        FLTFactory factory = new FLTFactory(multisig);
        FLTSinglePair implementation = new FLTSinglePair();

        _data = Data({
            // Name & Symbol
            name: "CAKE 2x Long Risedle",
            symbol: "CAKERISE",
            deploymentData: abi.encode(
                fCollateral,
                fDebt,
                address(oracle),
                pair,
                router
            ),
            implementation: address(implementation),
            factory: factory,
            // Params
            debtSlot: 1,
            collateralSlot: 1,
            totalCollateral: 200 ether, // 200 CAKE
            initialPriceInETH: 0.3 ether, // 0.3 BNB
            // Fuse params
            debtSupplyAmount: 1_000_000 ether // 1M BUSD
        });
    }
}
