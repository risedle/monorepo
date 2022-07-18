import { getBaseConfig } from "../../utils/getBaseConfig";

interface ChainIconProps {
    className: string;
}

export const BSCIcon = (props: ChainLogoProps) => {
    return (
        <div data-testid="ChainIconBSC">
            <svg
                className={props.className}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.13325 12.7585V14.3733L7.72528 15.2008L6.35735 14.3733V12.7585L7.72528 13.586L9.13325 12.7585ZM1.59961 7.17335L2.96754 8.00078V10.77L5.32306 12.178V13.7928L1.59961 11.5974V7.17335ZM13.8509 7.17335V11.6041L10.0875 13.7995V12.1847L12.443 10.7767V8.00078L13.8509 7.17335ZM10.0808 4.97798L11.4888 5.80541V7.42024L9.13325 8.82821V11.6442L7.76532 12.4716L6.39738 11.6442V8.82821L3.95512 7.42024V5.80541L5.36309 4.97798L7.71861 6.38595L10.0808 4.97798ZM3.9618 8.58132L5.32973 9.40875V11.0236L3.9618 10.1961V8.58132ZM11.4888 8.58132V10.1961L10.1208 11.0236V9.40875L11.4888 8.58132ZM2.96754 3.57001L4.37551 4.39744L2.96754 5.22488V6.83971L1.59961 6.01227V4.39744L2.96754 3.57001ZM12.483 3.57001L13.891 4.39744V6.01227L12.483 6.83971V5.22488L11.1151 4.39744L12.483 3.57001ZM7.72528 3.57001L9.13325 4.39744L7.72528 5.23155L6.35735 4.40412L7.72528 3.57001ZM7.72528 0.800781L11.4888 2.99615L10.1208 3.82358L7.76532 2.41561L5.36309 3.82358L4.00183 2.99615L7.72528 0.800781Z" />
            </svg>
        </div>
    );
};

export const ChainIcon = (props: ChainLogoProps) => {
    const baseConfig = getBaseConfig();

    // TODO: import ChainID types here
    switch (baseConfig.chainId) {
        case 56:
            return <BSCIcon className={props.className} />;
        default:
            return <div data-testid="ChainIconDefault">DEFAULT ICON</div>;
    }
};
