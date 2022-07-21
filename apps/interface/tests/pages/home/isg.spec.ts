import { getStaticProps } from "../../../pages/index";

describe("Given a user visits /", () => {
    it("should return correct data and revalidate duration", async () => {
        const props = await getStaticProps();
        expect(props.revalidate).toBe(3600);
        expect(props.props.tokens.length).toBeGreaterThanOrEqual(2);
    });
});
