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
        const showLessLink = screen.queryByTestId(
            "FLTInfoCardShowLessDescLink"
        );

        expect(firstParagraph).toBeVisible();
        expect(showMoreLink).toBeVisible();
        expect(secondParagraph).not.toBeVisible();
        expect(showLessLink).not.toBeVisible();
    });

    it("should show the right content when show more or show less clicked", () => {
        const firstParagraph = screen.queryByTestId(
            "FLTInfoCardDescFirstParagraph"
        );
        const showMoreLink = screen.queryByTestId(
            "FLTInfoCardShowMoreDescLink"
        );
        const secondParagraph = screen.queryByTestId(
            "FLTInfoCardDescSecondParagraph"
        );
        const showLessLink = screen.queryByTestId(
            "FLTInfoCardShowLessDescLink"
        );

        // Press show more link
        fireEvent.click(showMoreLink);

        // Expect to show second paragraph and hide show more link
        expect(firstParagraph).toBeVisible();
        expect(showMoreLink).not.toBeVisible();
        expect(secondParagraph).toBeVisible();
        expect(showLessLink).toBeVisible();

        // Press show less link
        fireEvent.click(showLessLink);

        // Expect to show initial state (default)
        expect(firstParagraph).toBeVisible();
        expect(showMoreLink).toBeVisible();
        expect(secondParagraph).not.toBeVisible();
        expect(showLessLink).not.toBeVisible();
    });
});
