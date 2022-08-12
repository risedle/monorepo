import { screen, render, fireEvent } from "@testing-library/react";

import FuseLeveragedTokenInfoCardDescription from "@/components/FuseLeveragedTokenInfoCard/Description";

describe("<FuseLeveragedTokenInfoCardDescription />", () => {
    beforeEach(() => {
        render(<FuseLeveragedTokenInfoCardDescription />);
    });
    it("should show first paragraph and show more link by default", () => {
        const firstParagraph = screen.queryByTestId(
            "FLTInfoCardDescFirstParagraph"
        );
        const showMoreLink = screen.queryByTestId(
            "FLTInfoCardShowMoreDescLink"
        );
        const secondParagraph = screen.queryByTestId(
            "FLTInfoCardDescSecondParagraph"
        );
        expect(firstParagraph).toBeVisible();
        expect(showMoreLink).toBeVisible();
        expect(secondParagraph).not.toBeVisible();
    });

    it("should show second paragraph when show more link is clicked", () => {
        const firstParagraph = screen.queryByTestId(
            "FLTInfoCardDescFirstParagraph"
        );
        const showMoreLink = screen.queryByTestId(
            "FLTInfoCardShowMoreDescLink"
        );
        const secondParagraph = screen.queryByTestId(
            "FLTInfoCardDescSecondParagraph"
        );

        fireEvent.click(showMoreLink);

        expect(firstParagraph).toBeVisible();
        expect(showMoreLink).not.toBeVisible();
        expect(secondParagraph).toBeVisible();
    });
});
