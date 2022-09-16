import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as SWR from "swr";

import InsightGenerator from "@/components/InsightGenerator";

// Mock window.computedStyle
jest.mock("dom-to-image");

describe("<InsightGenerator />", () => {
    describe("Test Tab ", () => {
        const mock = jest.spyOn(SWR, "default");
        mock.mockReturnValue({
            isLoaded: true,
            data: [
                {
                    symbol: "BNBRISE",
                    name: "2X Long BNB Risedle",
                    dailyGain: {
                        gain: -0.13222402124331772,
                        timestamp: 1662336000,
                    },
                    weeklyGain: {
                        gain: 1.908306486897899,
                        timestampStart: 1661731200,
                        timestampEnd: 1662336000,
                    },
                },
                {
                    symbol: "CAKERISE",
                    name: "2X Long CAKE Risedle",
                    dailyGain: {
                        gain: 1.0482143271474607,
                        timestamp: 1662336000,
                    },
                    weeklyGain: {
                        gain: 19.605954365256558,
                        timestampStart: 1661731200,
                        timestampEnd: 1662336000,
                    },
                },
                {
                    symbol: "CAKEDROP",
                    name: "2X Short CAKE Risedle",
                    dailyGain: {
                        gain: -0.5972900022947123,
                        timestamp: 1662336000,
                    },
                    weeklyGain: {
                        gain: -8.713324851648043,
                        timestampStart: 1661731200,
                        timestampEnd: 1662336000,
                    },
                },
                {
                    symbol: "BNBDROP",
                    name: "2X Short BNB Risedle",
                    dailyGain: {
                        gain: 0.0563770441720047,
                        timestamp: 1662336000,
                    },
                    weeklyGain: {
                        gain: -0.8939331322494761,
                        timestampStart: 1661731200,
                        timestampEnd: 1662336000,
                    },
                },
            ],
        });

        it("Should render daily tab", () => {
            render(<InsightGenerator />);

            const tab = screen.getByRole("tab", {
                name: /daily/i,
            });
            fireEvent.click(tab);
            const dailyText = screen.getByText(/24h top performers/i);
            expect(dailyText).toBeInTheDocument();
        });

        it("Should render daily tab", () => {
            render(<InsightGenerator />);

            const tab = screen.getByRole("tab", {
                name: /weekly/i,
            });
            fireEvent.click(tab);
            const dailyText = screen.getByText(/weekly top performers/i);
            expect(dailyText).toBeInTheDocument();
        });

        it("Should generate image", () => {
            render(<InsightGenerator />);
            const getImage = jest.fn();
            jest.spyOn(React, "useRef").mockReturnValue({
                current: getImage(),
            });

            const button = screen.getByRole("button", {
                name: /generate/i,
            });
            fireEvent.click(button);
            expect(getImage).toBeCalledTimes(1);
        });
    });
});
