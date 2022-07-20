import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ChainIcon } from "../../components/ChainIcon";
import * as BaseConfig from "../../utils/getBaseConfig";

describe("<ChainIcon />", () => {
    describe("Given default chainId", () => {
        it("should render based on base config", () => {
            const getBaseConfig = jest.spyOn(BaseConfig, "getBaseConfig");
            getBaseConfig.mockImplementation(() => {
                return { chainId: 56 };
            });
            render(<ChainIcon />);

            let icon = screen.getByTestId("ChainIconBSC");
            expect(icon).toBeInTheDocument();

            getBaseConfig.mockImplementation(() => {
                return { chainId: 42161 };
            });
            render(<ChainIcon />);

            icon = screen.getByTestId("ChainIconArbitrum");
            expect(icon).toBeInTheDocument();
        });
    });

    describe("Given specified chainId", () => {
        it("should render based on specified chainId", () => {
            const getBaseConfig = jest.spyOn(BaseConfig, "getBaseConfig");
            getBaseConfig.mockImplementation(() => {
                return { chainId: 56 };
            });
            render(<ChainIcon chainId={42161} />);

            let icon = screen.getByTestId("ChainIconArbitrum");
            expect(icon).toBeInTheDocument();

            getBaseConfig.mockImplementation(() => {
                return { chainId: 42161 };
            });
            render(<ChainIcon chainId={56} />);

            icon = screen.getByTestId("ChainIconBSC");
            expect(icon).toBeInTheDocument();
        });
    });
});
