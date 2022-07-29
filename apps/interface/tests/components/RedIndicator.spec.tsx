import { RedIndicatorIcon } from "@/components/Icons/RedIndicator";
import { render, screen } from "@testing-library/react";

describe("<RedIndicatorIcon />", () => {
    it("should render red indicator icon", () => {
        render(<RedIndicatorIcon />);
        const el = screen.queryByTestId("RedIndicatorIcon");
        expect(el).toBeInTheDocument();
    });
});
