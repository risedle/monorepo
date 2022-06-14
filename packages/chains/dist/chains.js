"use strict";
exports.__esModule = true;
exports.Chain = void 0;
/**
 * Supported chains at Risedle
 */
var Chain;
(function (Chain) {
    Chain[Chain["Mainnet"] = 1] = "Mainnet";
    Chain[Chain["Arbitrum"] = 42161] = "Arbitrum";
})(Chain || (Chain = {}));
exports.Chain = Chain;
