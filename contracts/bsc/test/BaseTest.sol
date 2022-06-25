pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import {ERC20} from "openzeppelin/token/ERC20/ERC20.sol";

import {RiseTokenFactory} from "flt/RiseTokenFactory.sol";
import {RiseToken} from "flt/RiseToken.sol";
import {UniswapAdapter} from "flt/adapters/UniswapAdapter.sol";
import {RariFusePriceOracleAdapter} from "flt/adapters/RariFusePriceOracleAdapter.sol";
import {IfERC20} from "flt/interfaces/IfERC20.sol";
import {IWETH9} from "flt/interfaces/IWETH9.sol";

/**
 * @title Rise Token Base Test
 * @notice We set all functions as internal coz we don't want it to run twice
 * @author bayu <bayu@risedle.com> <https://github.com/pyk>
 */
contract BaseTest is Test {
    // Test data to be defined in child contract
    struct TestData {
        address multisig;
        IWETH9 weth;
        ERC20 collateral;
        ERC20 debt;
        IfERC20 fCollateral;
        IfERC20 fDebt;
        string name;
        string symbol;
    }

    /// ███ feeRecipient █████████████████████████████████████████████████████

    /// @notice Test default state for RiseTokenFactory
    function _testFactoryDefaultStorage(TestData memory _data) internal {
        // Create new factory
        RiseTokenFactory factory = new RiseTokenFactory(_data.multisig);

        // Check
        require(
            factory.feeRecipient() == _data.multisig,
            "invalid fee recipient"
        );
    }

    /// ███ setFeeRecipient ██████████████████████████████████████████████████

    /// @notice Non-owner cannot set fee recipient
    function _testSetFeeRecipientAsNonOwnerRevert(TestData memory _data)
        public
    {
        // Create new factory
        RiseTokenFactory factory = new RiseTokenFactory(_data.multisig);

        // Transfer ownership
        address newOwner = vm.addr(2);
        factory.transferOwnership(newOwner);

        // Non-owner trying to set the fee recipient; It should be reverted
        address recipient = vm.addr(3);
        vm.expectRevert("Ownable: caller is not the owner");
        factory.setFeeRecipient(recipient);
    }

    /// @notice Owner can set fee recipient
    function _testSetFeeRecipientAsOwner(TestData memory _data) public {
        // Create new factory
        RiseTokenFactory factory = new RiseTokenFactory(_data.multisig);

        // Non-owner trying to set the fee recipient; It should be reverted
        address recipient = vm.addr(2);
        factory.setFeeRecipient(recipient);

        // Check
        assertEq(factory.feeRecipient(), recipient, "invalid recipient");
    }

    /// ███ create ███████████████████████████████████████████████████████████

    /// @notice Non-owner cannot create token
    function _testCreateAsNonOwnerRevert(TestData memory _data) public {
        // Create new factory
        RiseTokenFactory factory = new RiseTokenFactory(_data.multisig);

        // Transfer ownership
        address newOwner = vm.addr(2);
        factory.transferOwnership(newOwner);

        // Non-owner trying to set the fee recipient; It should be reverted
        vm.expectRevert("Ownable: caller is not the owner");
        factory.create(
            _data.fCollateral,
            _data.fDebt,
            UniswapAdapter(vm.addr(3)),
            RariFusePriceOracleAdapter(vm.addr(4))
        );
    }

    /// @notice Owner can create new Rise Token
    function _testCreateAsOwner(TestData memory _data) public {
        // Create new factory
        RiseTokenFactory factory = new RiseTokenFactory(_data.multisig);

        // Create new token
        UniswapAdapter uniswapAdapter = new UniswapAdapter(address(_data.weth));
        RariFusePriceOracleAdapter oracleAdapter = new RariFusePriceOracleAdapter();
        RiseToken riseToken = factory.create(
            _data.fCollateral,
            _data.fDebt,
            uniswapAdapter,
            oracleAdapter
        );

        // Check public properties
        assertEq(riseToken.name(), _data.name, "invalid name");
        assertEq(riseToken.symbol(), _data.symbol, "invalid symbol");
        assertEq(riseToken.decimals(), 18, "invalid decimals");

        assertEq(
            address(riseToken.factory()),
            address(factory),
            "invalid factory"
        );
        assertEq(
            address(riseToken.collateral()),
            address(_data.collateral),
            "invalid collateral"
        );
        assertEq(
            address(riseToken.debt()),
            address(_data.debt),
            "invalid debt"
        );
        assertEq(
            address(riseToken.fCollateral()),
            address(_data.fCollateral),
            "invalid fCollateral"
        );
        assertEq(
            address(riseToken.fDebt()),
            address(_data.fDebt),
            "invalid fDebt"
        );
        assertEq(riseToken.owner(), address(this), "invalid owner");
        assertEq(
            address(riseToken.uniswapAdapter()),
            address(uniswapAdapter),
            "invalid uniswap adapter"
        );
        assertEq(
            address(riseToken.oracleAdapter()),
            address(oracleAdapter),
            "check oracle adapter"
        );
    }
}
