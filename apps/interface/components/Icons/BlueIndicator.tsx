import { Icon, IconProps } from "@chakra-ui/react";

export const BlueIndicator = (props: IconProps) => (
    <Icon
        data-testid="IndicatorIcon"
        viewBox="0 0 32 32"
        color="sky.dark.10"
        {...props}
    >
        <g filter="url(#filter0_d_3427_218392)">
            <circle cx="16" cy="16.5" r="4" fill="currentColor" />
        </g>
        <defs>
            <filter
                id="filter0_d_3427_218392"
                x="0"
                y="0.5"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="6" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.541176 0 0 0 0 0.909804 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3427_218392"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3427_218392"
                    result="shape"
                />
            </filter>
        </defs>
    </Icon>
);

export default BlueIndicator;
