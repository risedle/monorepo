import { render, screen } from "@testing-library/react";

import { BlueIndicatorIcon } from "@/components/Icons/BlueIndicator";

describe("<BlueIndicatorIcon />", () => {
    it("should render red indicator icon", () => {
        render(<BlueIndicatorIcon />);
        const el = screen.queryByTestId("BlueIndicatorIcon");
        expect(el).toBeInTheDocument();
    });
});
