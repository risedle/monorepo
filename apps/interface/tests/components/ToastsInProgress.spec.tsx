import { render, screen } from "@testing-library/react";

import InProgressToast from "@/components/Toasts/InProgress";

describe("<InProgressToast />", () => {
    it("should render dots icon", () => {
        render(<InProgressToast />);

        const icon = screen.queryByTestId("DotsIcon");
        expect(icon).toBeInTheDocument();
    });
});
