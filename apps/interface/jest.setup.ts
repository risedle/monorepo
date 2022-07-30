import "@testing-library/jest-dom";

/**
 * NOTE: We use this to mock window.watchMedia on jest
 * docs: https://www.npmjs.com/package/mock-match-media#jest
 * */
import "mock-match-media/jest-setup";

/**
 * Mock rainbowkit
 * see here: https://github.com/rainbow-me/rainbowkit/issues/461#issuecomment-1190043830
 */
jest.mock("@rainbow-me/rainbowkit", () => ({
    ConnectButton: {
        Custom: jest.fn(),
    },
    RainbowKitProvider: jest.fn(),
    useConnectModal: () => ({
        openConnectModal: jest.fn(),
    }),
}));
