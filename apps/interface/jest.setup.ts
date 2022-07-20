/**
 * NOTE: We use this to mock window.watchMedia on jest
 * docs: https://www.npmjs.com/package/mock-match-media#jest
 * */
import "mock-match-media/jest-setup";

/**
 * Mock rainbowkit
 * see here:
 */
jest.mock("@rainbow-me/rainbowkit", () => ({
    ConnectButton: {
        Custom: jest.fn(),
    },
    RainbowKitProvider: jest.fn(),
}));
