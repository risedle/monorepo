import { render, screen } from "@testing-library/react";

import ErrorToast from "@/components/Toasts/Error";

describe("<ErrorToast />", () => {
    it("should render warning icon", () => {
        render(<ErrorToast />);

        const icon = screen.queryByTestId("WarningIcon");
        expect(icon).toBeInTheDocument();
    });
});
