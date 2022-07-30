import { render, screen } from "@testing-library/react";

import { WarningIcon } from "@/components/Icons/Warning";

describe("<WarningIcon />", () => {
    it("should render red indicator icon", () => {
        render(<WarningIcon />);
        const el = screen.queryByTestId("WarningIcon");
        expect(el).toBeInTheDocument();
    });
});
