import { getStaticProps } from "@/pages/index";

describe("Given a user visits /", () => {
    it("should return correct data and revalidate duration", async () => {
        // Increase the timeout
        jest.setTimeout(60 * 1000); // 60s
        const props = await getStaticProps();
        expect(props.revalidate).toBe(3600);
        expect(props.props.tokens.length).toBeGreaterThanOrEqual(2);
    });
});
