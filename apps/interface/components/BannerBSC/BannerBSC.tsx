import {
    Banner,
    BannerContentContainer,
    BannerContent,
    BannerItem,
} from "../../uikit/Banner";

function BannerBSC() {
    return (
        <Banner closeAble>
            <a href="https://bsc.risedle.com" rel="noreferrer" target="_blank">
                <BannerContentContainer>
                    <BannerContent>
                        <BannerItem variant="base">
                            Binance Smart Chain
                        </BannerItem>
                        <BannerItem variant="base" isIcon />
                    </BannerContent>
                    <BannerContent>
                        <BannerItem variant="chain">
                            <div>Risedle New Network</div>
                        </BannerItem>
                        <BannerItem variant="chain" isIcon />
                    </BannerContent>
                </BannerContentContainer>
            </a>
        </Banner>
    );
}

export { BannerBSC };
