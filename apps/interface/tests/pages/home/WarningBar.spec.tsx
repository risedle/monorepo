import "@testing-library/jest-dom/extend-expect";
import Home from "../../../pages/index";
import { render, screen, waitFor } from "@testing-library/react";
import * as BaseConfig from "../../../utils/getBaseConfig";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

// simulate window resize
async function fireResize(width) {
    // NOTE: Wrapped in waitFor to suppress 'act' warning
    await waitFor(async () => {
        window.innerWidth = width;
        window.dispatchEvent(new Event("resize"));
    });
}

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

        it("WarningBar should have class 'overflow-x-hidden'", () => {
            const warningBar = screen.getByTestId("WarningBar");
            expect(warningBar).toHaveClass("overflow-x-hidden");
        });

        describe("When the screen width is 375px", () => {
            it("WarningBarContent count should be 2", async () => {
                await fireResize(375);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(2);
            });
        });

        describe("When the screen width is 1440px", () => {
            it("WarningBarContent count should be 2", async () => {
                await fireResize(1440);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(4);
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

        it("WarningBar should have class 'overflow-x-hidden'", () => {
            const warningBar = screen.getByTestId("WarningBar");
            expect(warningBar).toHaveClass("overflow-x-hidden");
        });

        describe("When the screen width is 375px", () => {
            it("WarningBarContent count should be 2", async () => {
                await fireResize(375);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(2);
            });
        });

        describe("When the screen width is 1440px", () => {
            it("WarningBarContent count should be 5", async () => {
                await fireResize(1440);
                const contents = await screen.findAllByTestId(
                    "WarningBarContent"
                );
                expect(contents.length).toBe(5);
            });
        });
    });
});
