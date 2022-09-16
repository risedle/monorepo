import { render, screen } from "@testing-library/react";

import ChainIcon from "@/components/Icons/Chain";

import * as BaseConfig from "@/utils/getBaseConfig";
jest.mock("@/utils/getBaseConfig");

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("<ChainIcon />", () => {
    describe("Given default chainId", () => {
        it("should render based on base config", () => {
            BaseConfig.getBaseConfig.mockReturnValue({ chainId: 56 });
            render(<ChainIcon />);

            let icon = screen.getByTestId("ChainIconBSC");
            expect(icon).toBeInTheDocument();

            BaseConfig.getBaseConfig.mockReturnValue({ chainId: 42161 });
            render(<ChainIcon />);

            icon = screen.getByTestId("ChainIconArbitrum");
            expect(icon).toBeInTheDocument();
        });
    });

    describe("Given specified chainId", () => {
        it("should render based on specified chainId", () => {
            BaseConfig.getBaseConfig.mockReturnValue({ chainId: 56 });
            render(<ChainIcon chainId={42161} />);

            let icon = screen.getByTestId("ChainIconArbitrum");
            expect(icon).toBeInTheDocument();

            BaseConfig.getBaseConfig.mockReturnValue({ chainId: 42161 });
            render(<ChainIcon chainId={56} />);

            icon = screen.getByTestId("ChainIconBSC");
            expect(icon).toBeInTheDocument();
        });
    });
});
