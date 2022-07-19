import "@testing-library/jest-dom/extend-expect";
import Home from "../../../pages/index";
import { render, screen, waitFor } from "@testing-library/react";
import * as BaseConfig from "../../../utils/getBaseConfig";
import { fireResizeEvent } from "../../utils/fireResizeEvent";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given a user visit /", () => {
    describe("Given random chainId", () => {
        beforeEach(() => {
            // Mock a base config
            const mock = jest
                .spyOn(BaseConfig, "getBaseConfig")
                .mockImplementation(() => {
                    return { chainId: 1234 };
                });
            render(<Home />);
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

        describe("When the screen width is 375px", () => {
            it("WarningBarContent count should be 2", async () => {
                await fireResizeEvent(375);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(2);
            });
        });

        describe("When the screen width is 1440px", () => {
            it("WarningBarContent count should be 5", async () => {
                await fireResizeEvent(1440);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(5);
            });
        });
    });

    describe("Given BNB Smart Chain", () => {
        beforeEach(() => {
            // Mock a base config
            const mock = jest
                .spyOn(BaseConfig, "getBaseConfig")
                .mockImplementation(() => {
                    return { chainId: 56 };
                });
            render(<Home />);
        });

        it("WarningBar should render BSC icons", async () => {
            const defaultIcons = await screen.findAllByTestId("ChainIconBSC");
            expect(defaultIcons.length).toBeGreaterThan(2);
        });

        it("WarningBar should have style overflow:hidden", () => {
            const warningBar = screen.getByTestId("WarningBar");
            expect(warningBar).toHaveStyle("overflow-x: hidden");
        });

        describe("When the screen width is 375px", () => {
            it("WarningBarContent count should be 2", async () => {
                await fireResizeEvent(375);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(2);
            });
        });

        describe("When the screen width is 1440px", () => {
            it("WarningBarContent count should be 5", async () => {
                await fireResizeEvent(1440);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(5);
            });
        });
    });
});
