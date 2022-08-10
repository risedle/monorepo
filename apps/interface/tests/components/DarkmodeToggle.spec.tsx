import { screen, render } from "@testing-library/react";
import chakra from "../utils/chakra";

import { DarkmodeToggle } from "@/components/DarkmodeToggle";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Given useColorMode == 'dark'", () => {
    it("<DarkmodeIcon /> should be rendered", () => {
        const useColorMode = jest.spyOn(chakra, "useColorMode");
        useColorMode.mockReturnValue({ colorMode: "dark" });

        render(<DarkmodeToggle />);
        setTimeout(() => {
            const darkmodeIcon = screen.queryByTestId("DarkmodeIcon");
            expect(darkmodeIcon).toBeInTheDocument();
        }, 500);
    });

    it("<LightmodeIcon /> should not be rendered", () => {
        const useColorMode = jest.spyOn(chakra, "useColorMode");
        useColorMode.mockReturnValue({ colorMode: "dark" });

        render(<DarkmodeToggle />);
        setTimeout(() => {
            const lightmodeIcon = screen.queryByTestId("LightmodeIcon");
            expect(lightmodeIcon).not.toBeInTheDocument();
        }, 500);
    });
});

describe("Given useColorMode == 'light'", () => {
    it("<LightmodeIcon /> should be rendered", () => {
        const useColorMode = jest.spyOn(chakra, "useColorMode");
        useColorMode.mockReturnValue({ colorMode: "light" });

        render(<DarkmodeToggle />);
        const lightmodeIcon = screen.queryByTestId("LightmodeIcon");
        expect(lightmodeIcon).toBeInTheDocument();
    });

    it("<DarkmodeIcon /> should not be rendered", () => {
        const useColorMode = jest.spyOn(chakra, "useColorMode");
        useColorMode.mockReturnValue({ colorMode: "light" });

        render(<DarkmodeToggle />);
        const darkmodeIcon = screen.queryByTestId("DarkmodeIcon");
        expect(darkmodeIcon).not.toBeInTheDocument();
    });
});
