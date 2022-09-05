import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import InsightImageDOM from "@/components/InsightImageDOM";
import * as SWR from "swr";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<InsightImageDOM />", () => {
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
