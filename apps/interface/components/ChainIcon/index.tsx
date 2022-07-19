import { getBaseConfig } from "../../utils/getBaseConfig";
import { Icon } from "@chakra-ui/react";

interface ChainIconProps {
    // TODO(pyk): use ChainId enum from @risedle/types
    chainId: number;
    className: string;
}

export const ChainIconBSC = (props) => {
    return (
        <Icon data-testid="ChainIconBSC" viewBox="0 0 16 16" {...props}>
            <path
                fill="currentColor"
                d="M9.13325 12.7585V14.3733L7.72528 15.2008L6.35735 14.3733V12.7585L7.72528 13.586L9.13325 12.7585ZM1.59961 7.17335L2.96754 8.00078V10.77L5.32306 12.178V13.7928L1.59961 11.5974V7.17335ZM13.8509 7.17335V11.6041L10.0875 13.7995V12.1847L12.443 10.7767V8.00078L13.8509 7.17335ZM10.0808 4.97798L11.4888 5.80541V7.42024L9.13325 8.82821V11.6442L7.76532 12.4716L6.39738 11.6442V8.82821L3.95512 7.42024V5.80541L5.36309 4.97798L7.71861 6.38595L10.0808 4.97798ZM3.9618 8.58132L5.32973 9.40875V11.0236L3.9618 10.1961V8.58132ZM11.4888 8.58132V10.1961L10.1208 11.0236V9.40875L11.4888 8.58132ZM2.96754 3.57001L4.37551 4.39744L2.96754 5.22488V6.83971L1.59961 6.01227V4.39744L2.96754 3.57001ZM12.483 3.57001L13.891 4.39744V6.01227L12.483 6.83971V5.22488L11.1151 4.39744L12.483 3.57001ZM7.72528 3.57001L9.13325 4.39744L7.72528 5.23155L6.35735 4.40412L7.72528 3.57001ZM7.72528 0.800781L11.4888 2.99615L10.1208 3.82358L7.76532 2.41561L5.36309 3.82358L4.00183 2.99615L7.72528 0.800781Z"
            />
        </Icon>
    );
};

export const ChainIconArbitrum = (props) => {
    return (
        <Icon data-testid="ChainIconBSC" viewBox="0 0 17 19" {...props}>
            <path
                d="M10.148 8.74696L11.4837 6.5039L15.084 12.0535L15.0857 13.1185L15.074 5.78979C15.0654 5.61065 14.9693 5.44677 14.8159 5.35012L8.33411 1.6602C8.18258 1.58642 7.99021 1.58727 7.83886 1.66253C7.8184 1.67262 7.79915 1.68367 7.78087 1.69572L7.75824 1.70977L1.46664 5.31801L1.44225 5.32898C1.41086 5.34326 1.37909 5.36143 1.34934 5.38252C1.23002 5.46716 1.15083 5.59237 1.1252 5.73281C1.12135 5.75409 1.1185 5.77574 1.11719 5.79765L1.12708 11.7699L4.48053 6.62584C4.90277 5.94377 5.82263 5.72406 6.67658 5.736L7.67882 5.76217L1.77342 15.1349L2.46955 15.5315L8.44564 5.7717L11.0871 5.76221L5.12642 15.7683L7.61041 17.1823L7.90719 17.3512C8.03273 17.4017 8.18074 17.4042 8.30733 17.359L14.8802 13.5892L13.6236 14.3099L10.148 8.74696ZM10.6576 16.011L8.14875 12.1141L9.68025 9.54211L12.9752 14.6818L10.6576 16.011Z"
                fill="#2D374B"
            />
            <path
                d="M8.14844 12.1149L10.6572 16.0119L12.9748 14.6826L9.67991 9.54297L8.14844 12.1149Z"
                fill="#28A0F0"
            />
            <path
                d="M15.0881 13.1186L15.0863 12.0535L11.4861 6.50391L10.1504 8.74697L13.6259 14.3099L14.8826 13.5892C15.0058 13.4901 15.0804 13.3447 15.0883 13.1879L15.0881 13.1186Z"
                fill="#28A0F0"
            />
            <path
                d="M0 14.1217L1.77456 15.1337L7.67993 5.76101L6.6777 5.73483C5.82374 5.72289 4.90385 5.9426 4.48164 6.62468L1.12818 11.7687L0 13.4842V14.1217Z"
                fill="white"
            />
            <path
                d="M11.0883 5.76172L8.4468 5.77121L2.4707 15.531L4.55954 16.7212L5.12758 15.7678L11.0883 5.76172Z"
                fill="white"
            />
            <path
                d="M16.2 5.74928C16.1779 5.20257 15.8788 4.70209 15.4103 4.41071L8.84348 0.673336C8.38003 0.442394 7.80109 0.442098 7.33681 0.673188C7.28193 0.700587 0.950762 4.33445 0.950762 4.33445C0.863137 4.37605 0.778734 4.42558 0.699351 4.48182C0.281119 4.77846 0.0261863 5.23946 0 5.74591V13.4859L1.12818 11.7704L1.11833 5.79822C1.11964 5.77638 1.12242 5.75488 1.12635 5.73367C1.15186 5.59316 1.23113 5.4678 1.35049 5.38309C1.38027 5.36199 7.81959 1.67318 7.84005 1.66306C7.9914 1.58784 8.18377 1.58695 8.3353 1.66073L14.8171 5.35057C14.9705 5.44723 15.0666 5.6111 15.0752 5.79025V13.1883C15.0673 13.3452 15.0046 13.4906 14.8814 13.5897L13.6248 14.3103L12.9763 14.6822L10.6588 16.0115L8.30848 17.3594C8.18189 17.4047 8.03388 17.4021 7.90834 17.3516L5.12757 15.7688L4.55953 16.7222L7.0585 18.1462C7.14115 18.1927 7.21476 18.2339 7.27519 18.2675C7.36873 18.3194 7.43249 18.3541 7.45501 18.3649C7.63262 18.4503 7.88819 18.5 8.11847 18.5C8.32961 18.5 8.5355 18.4616 8.73031 18.3861L15.5569 14.4735C15.9487 14.1731 16.1792 13.72 16.2 13.2291V5.74928Z"
                fill="#96BEDC"
            />
        </Icon>
    );
};

export const ChainIcon = (props) => {
    const baseConfig = getBaseConfig();
    const chainId = props.chainId ? props.chainId : baseConfig.chainId;

    // TODO: import ChainID types here
    switch (chainId) {
        case 56:
            return <ChainIconBSC {...props} />;
        case 1:
            return <ChainIconArbitrum />;
        default:
            return <div data-testid="ChainIconDefault">DEFAULT ICON</div>;
    }
};
