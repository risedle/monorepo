import {
    Banner,
    BannerItem,
    BannerContentContainer,
    BannerContent,
} from "../../uikit/Banner";
import { getBaseConfig } from "../../utils/getBaseConfig";

function NewWarningBar() {
    const baseConfig = getBaseConfig();

    return (
        <Banner>
            <BannerContentContainer>
                <BannerContent>
                    <BannerItem variant="chain">
                        <div>Use at your own risk</div>
                    </BannerItem>
                    <BannerItem variant="chain" isIcon />
                </BannerContent>
                <BannerContent>
                    <BannerItem variant="base">
                        {`${baseConfig.chainName}`}
                    </BannerItem>
                    <BannerItem variant="base" isIcon />
                </BannerContent>
            </BannerContentContainer>
        </Banner>
    );
}

export { NewWarningBar };
