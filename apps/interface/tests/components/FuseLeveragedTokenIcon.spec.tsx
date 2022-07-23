import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { FuseLeveragedTokenIcon } from "../../components/Icons/FuseLeveragedToken";
import chakra from "../utils/chakra";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

// NOTE: we cannot pass custom data attribute to next/image hence we only test
// this scenario
describe("<FuseLeveragedTokenIcon />", () => {
    it("should optimize image", () => {
        const useColorModeMock = jest.spyOn(chakra, "useColorMode");
        useColorModeMock.mockReturnValue({ colorMode: "light" });
        render(<FuseLeveragedTokenIcon name="Something" symbol="SOME" />);

        const icon = screen.getByRole("img");
        expect(icon).not.toHaveAttribute("href", "/icons/SOME-light.svg");
    });
});
