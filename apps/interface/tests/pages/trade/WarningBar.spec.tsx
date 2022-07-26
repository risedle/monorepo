import { screen } from "@testing-library/react";
import * as BaseConfig from "../../../utils/getBaseConfig";
import nextRouter from "next/router";

import renderApp from "../../utils/renderApp";
import Trade from "../../../pages/trade/[symbol]";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/trade/ethrise",
            pathname: "/trade/ethrise",
        }));
    });

    describe("Given random chainId", () => {
        beforeEach(async () => {
            // Mock a base config
            const getBaseConfig = jest.spyOn(BaseConfig, "getBaseConfig");
            getBaseConfig.mockImplementation(() => {
                return { chainId: 1234, supportedChains: [] };
            });
            renderApp(
                <Trade
                    prices={[]}
                    address="0xec448Dcb1FF0A8724EA8cF5c5348d88207d6e9D9"
                    collateral={{ symbol: "A" }}
                    debt={{ symbol: "A" }}
                />
            );
        });

        it("WarningBar should render default icons", async () => {
            const defaultIcons = await screen.findAllByTestId(
                "ChainIconDefault"
            );
            expect(defaultIcons.length).toBeGreaterThan(2);
        });

        it("WarningBar should have style overflow:hidden", () => {
            const warningBar = screen.getByTestId("WarningBar");
            expect(warningBar).toHaveStyle("overflow-x: hidden");
        });
    });

    describe("Given BNB Smart Chain", () => {
        beforeEach(async () => {
            // Mock a base config
            const mock = jest
                .spyOn(BaseConfig, "getBaseConfig")
                .mockImplementation(() => {
                    return { chainId: 56, supportedChains: [] };
                });
            renderApp(
                <Trade
                    prices={[]}
                    address="0xec448Dcb1FF0A8724EA8cF5c5348d88207d6e9D9"
                    collateral={{ symbol: "A" }}
                    debt={{ symbol: "A" }}
                />
            );
        });

        it("WarningBar should render BSC icons", async () => {
            const defaultIcons = await screen.findAllByTestId("ChainIconBSC");
            expect(defaultIcons.length).toBeGreaterThan(2);
        });

        it("WarningBar should have style overflow:hidden", () => {
            const warningBar = screen.getByTestId("WarningBar");
            expect(warningBar).toHaveStyle("overflow-x: hidden");
        });
    });
});
