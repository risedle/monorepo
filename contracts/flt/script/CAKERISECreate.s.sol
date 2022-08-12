// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

interface IF {
    function create(
        string memory _name,
        string memory _symbol,
        bytes memory _data,
        address _implementation
    ) external returns (address _token);
}

contract CreateCAKERISE is Script {
    function run() public {
        address factory = 0x888884173B6E6f4B42731853b89c39591ac53d92;
        address implementation = 0x88888883d280FB0b1b471BC952E60f3e8DE72592;

        address fCAKE = 0xbd163D07015ae3c0701304E20FEBAB421A2020aA;
        address fBUSD = 0x1f6B34d12301d6bf0b52Db7938Fc90ab4f12fE95;
        address oracle = 0x88888885EAf9c96B31b5a55CAF3173Fc6eb14ca6;
        address pair = 0x804678fa97d91B974ec2af3c843270886528a9E6;
        address router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

        string memory name = "2X Long CAKE Risedle";
        string memory symbol = "CAKERISE";
        bytes memory data = abi.encode(fCAKE, fBUSD, oracle, pair, router);

        vm.startBroadcast();
        IF(factory).create(name, symbol, data, implementation);
    }
}
