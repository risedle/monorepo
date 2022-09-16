import { render, screen } from "@testing-library/react";
import * as BaseConfig from "@/utils/getBaseConfig";
jest.mock("@/utils/getBaseConfig");

import Home from "@/pages/index";
import nextRouter from "next/router";
jest.mock("next/router", () => ({
    ...jest.requireActual("next/router"),
}));

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(nextRouter, "useRouter");
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "/",
        }));
    });

    describe("Given random chainId", () => {
        beforeEach(async () => {
            BaseConfig.getBaseConfig.mockReturnValue({
                chainId: 1234,
                supportedChains: [],
            });
            render(<Home tokens={[]} />);
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
            BaseConfig.getBaseConfig.mockReturnValue({
                chainId: 56,
                supportedChains: [],
            });
            render(<Home tokens={[]} />);
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
