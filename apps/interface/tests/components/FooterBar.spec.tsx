import { render, screen } from "@testing-library/react";

import { FooterBar } from "../../components/FooterBar";

describe("<FooterBar />", () => {
    it("should render links correctly", () => {
        render(<FooterBar />);

        const labs = screen.queryByTestId("FooterBarLinkLabs");
        expect(labs).toBeInTheDocument();
        expect(labs).toHaveAttribute("href", "https://risedle.com");

        const docs = screen.queryByTestId("FooterBarLinkDocs");
        expect(docs).toBeInTheDocument();
        expect(docs).toHaveAttribute("href", "https://docs.risedle.com");
        expect(docs).toHaveAttribute("target", "_blank");

        const twitter = screen.queryByTestId("FooterBarLinkTwitter");
        expect(twitter).toBeInTheDocument();
        expect(twitter).toHaveAttribute("href", "https://twitter.com/risedle");
        expect(twitter).toHaveAttribute("target", "_blank");

        const discord = screen.queryByTestId("FooterBarLinkDiscord");
        expect(discord).toBeInTheDocument();
        expect(discord).toHaveAttribute(
            "href",
            "https://discord.com/invite/YCSCd97SXj"
        );
        expect(discord).toHaveAttribute("target", "_blank");

        const github = screen.queryByTestId("FooterBarLinkGithub");
        expect(github).toBeInTheDocument();
        expect(github).toHaveAttribute("href", "https://github.com/risedle");
        expect(github).toHaveAttribute("target", "_blank");
    });
});
