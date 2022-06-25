pragma solidity ^0.8.0;

import {ERC20} from "openzeppelin/token/ERC20/ERC20.sol";

import {BaseTest} from "./BaseTest.sol";
import { IfERC20 } from "flt/interfaces/IfERC20.sol";
import {IWETH9} from "flt/interfaces/IWETH9.sol";

/**
 * @title BTCBRISE
 * @notice This is to ensure that everything is working as intended
 * @author bayu <bayu@risedle.com> <https://github.com/pyk>
 */

contract BTCBRISE is BaseTest {
    /// ███ Test data  ███████████████████████████████████████████████████████

    TestData data = TestData({
        // Risedle Multisig on Binance
        multisig: 0x0F12290d070b81B190fAeb07fB65b00882Cc266A,

        // WETH -> WBNB on binance
        weth: IWETH9(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c),

        // BTCB & BUSD
        collateral: ERC20(0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c),
        debt: ERC20(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56),

        // fBTCB & fBUSD
        fCollateral: IfERC20(0xedbA62938b615456A69E811a151378E26108F7eF),
        fDebt: IfERC20(0x1f6B34d12301d6bf0b52Db7938Fc90ab4f12fE95),

        // Name & Symbol
        name: "BTCB 2x Long Risedle",
        symbol: "BTCBRISE"
    });

    /// ███ Factory  █████████████████████████████████████████████████████████

    function testDefaultStorage() public {
        _testFactoryDefaultStorage(data);
    }

    function testSetFeeRecipientAsNonOwnerRevert() public {
        _testSetFeeRecipientAsNonOwnerRevert(data);
    }

    function testSetFeeRecipientAsOwner() public {
        _testSetFeeRecipientAsOwner(data);
    }

    function testCreateAsNonOwnerRevert() public {
        _testCreateAsNonOwnerRevert(data);
    }

    function testCreateAsOwner() public {
        _testCreateAsOwner(data);
    }
}
