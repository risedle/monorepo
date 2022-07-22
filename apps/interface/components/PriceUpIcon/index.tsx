import { Icon, IconProps } from "@chakra-ui/react";

export const PriceUpIcon = (props: IconProps) => {
    console.log("DEBUG: PriceUpIcon");
    return (
        <Icon data-testid="PriceUpIcon" viewBox="0 0 16 16" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.81246 2.14645C8.00772 1.95118 8.32431 1.95118 8.51957 2.14645L12.5196 6.14645C12.7148 6.34171 12.7148 6.65829 12.5196 6.85355C12.3243 7.04882 12.0077 7.04882 11.8125 6.85355L8.66602 3.70711L8.66602 12.5C8.66602 12.7761 8.44216 13 8.16602 13C7.88987 13 7.66602 12.7761 7.66602 12.5L7.66602 3.70711L4.51957 6.85355C4.32431 7.04882 4.00772 7.04882 3.81246 6.85355C3.6172 6.65829 3.6172 6.34171 3.81246 6.14645L7.81246 2.14645Z"
                fill="currentColor"
            />
        </Icon>
    );
};
