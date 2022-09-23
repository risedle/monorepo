import { render, screen } from "@testing-library/react";

import Header from "@/organisms/header";

describe("Given default", () => {
    it("Should render <header>", () => {
        const { container } = render(<Header />);
        const header = container.querySelector("header");
        expect(header).toBeTruthy();
    });
});
