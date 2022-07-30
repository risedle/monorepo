import { Icon, IconProps } from "@chakra-ui/react";

export const DotsIcon = (props: IconProps) => (
    <Icon data-testid="DotsIcon" viewBox="0 0 16 16" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.625 8C3.625 8.62132 3.12132 9.125 2.5 9.125C1.87868 9.125 1.375 8.62132 1.375 8C1.375 7.37868 1.87868 6.875 2.5 6.875C3.12132 6.875 3.625 7.37868 3.625 8ZM8.625 8C8.625 8.62132 8.12132 9.125 7.5 9.125C6.87868 9.125 6.375 8.62132 6.375 8C6.375 7.37868 6.87868 6.875 7.5 6.875C8.12132 6.875 8.625 7.37868 8.625 8ZM12.5 9.125C13.1213 9.125 13.625 8.62132 13.625 8C13.625 7.37868 13.1213 6.875 12.5 6.875C11.8787 6.875 11.375 7.37868 11.375 8C11.375 8.62132 11.8787 9.125 12.5 9.125Z"
            fill="currentColor"
        />
    </Icon>
);

export default DotsIcon;
