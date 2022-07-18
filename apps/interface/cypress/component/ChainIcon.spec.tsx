import { ChainIcon } from "../../components/ChainIcon";
import config from "../../utils/getBaseConfig";

describe("<ChainIcon />", () => {
    describe("Given unsupported chainId", () => {
        it("should render default icon", () => {
            console.log(config);
            console.log(ChainIcon);
            cy.stub(config, "getBaseConfig", () => {
                return {
                    chainId: 100,
                };
            });
            cy.mount(<ChainIcon />);
            cy.get("[data-testid=ChainIconDefault]").should("be.visible");
        });
    });
});
