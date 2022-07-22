import { Icon, IconProps } from "@chakra-ui/react";

export const PriceDownIcon = (props: IconProps) => {
    return (
        <Icon data-testid="PriceDownIcon" viewBox="0 0 16 16" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.18754 12.8535C7.99228 13.0488 7.67569 13.0488 7.48043 12.8535L3.4804 8.85355C3.2852 8.65829 3.2852 8.34171 3.4804 8.14645C3.6757 7.95118 3.9923 7.95118 4.1875 8.14645L7.33398 11.2929V2.5C7.33398 2.2239 7.55784 2 7.83398 2C8.11013 2 8.33398 2.2239 8.33398 2.5V11.2929L11.4804 8.14645C11.6757 7.95118 11.9923 7.95118 12.1875 8.14645C12.3828 8.34171 12.3828 8.65829 12.1875 8.85355L8.18754 12.8535Z"
                fill="currentColor"
            />
        </Icon>
    );
};
