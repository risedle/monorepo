import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import InsightImageDOM, { exportImage } from "@/components/InsightImageDOM";
import * as SWR from "swr";
import React from "react";
import domtoimage from "dom-to-image";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<InsightImageDOM />", () => {
    describe("Test function", () => {
        const { getComputedStyle } = window;
        window.getComputedStyle = (elt) => getComputedStyle(elt);
        jest.setTimeout(10000);
        it("Should return download", async () => {
            const div = document.createElement("div");
            const link = {
                click: jest.fn(),
            };
            jest.spyOn(document, "createElement").mockImplementation(
                () => link
            );
            jest.spyOn(domtoimage, "toJpeg").mockImplementation(
                (div) => "data:application/txt,hello%20world"
            );

            await exportImage(div, "test.jpeg");
            expect(link.click).toHaveBeenCalledTimes(1);
            expect(link.href).toEqual("data:application/txt,hello%20world");
            expect(link.download).toEqual("test.jpeg");
        });

        it("Should return alert", async () => {
            const div = document.createElement("div");
            window.alert = jest.fn();

            await exportImage(null, "test.jpeg");

            const link = {
                click: jest.fn(),
            };
            expect(window.alert).toHaveBeenCalledTimes(1);
        });
    });
    describe("Test Data", () => {
        it("should render loading", () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValue({
                isLoaded: false,
            });
            render(<InsightImageDOM type="daily" />);
            const insightGeneratorContent = screen.getByTestId(
                "LoadingInsightGenerator"
            );
            expect(insightGeneratorContent).toBeInTheDocument();
        });
        it("should render error", () => {
            const mock = jest.spyOn(SWR, "default");
            mock.mockReturnValue({
                isLoaded: true,
                error: "Something went wrong",
            });
            render(<InsightImageDOM type="daily" />);
            const insightGeneratorContent = screen.getByTestId(
                "ErrorInsightGenerator"
            );
            expect(insightGeneratorContent).toBeInTheDocument();
        });
        it("should render shareable page content with valid data", () => {
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
            render(<InsightImageDOM type="daily" />);

            const insightGeneratorContent = screen.getByTestId(
                "InsightGeneratorDiv"
            );
            expect(insightGeneratorContent).toBeInTheDocument();
        });
    });
});
