import { render, screen } from "@testing-library/react";

import { DotsIcon } from "@/components/Icons/Dots";

describe("<DotsIcon />", () => {
    it("should render red indicator icon", () => {
        render(<DotsIcon />);
        const el = screen.queryByTestId("DotsIcon");
        expect(el).toBeInTheDocument();
    });
});
