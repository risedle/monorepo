import { Icon, IconProps } from "@chakra-ui/react";

const HamburgerIcon = (props: IconProps) => (
    <Icon data-testid="HamburgerIcon" viewBox="0 0 14 10" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5H13C13.2761 1.5 13.5 1.27614 13.5 1C13.5 0.723858 13.2761 0.5 13 0.5H1ZM0.5 5C0.5 4.72386 0.723858 4.5 1 4.5H13C13.2761 4.5 13.5 4.72386 13.5 5C13.5 5.27614 13.2761 5.5 13 5.5H1C0.723858 5.5 0.5 5.27614 0.5 5ZM0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H13C13.2761 8.5 13.5 8.72386 13.5 9C13.5 9.27614 13.2761 9.5 13 9.5H1C0.723858 9.5 0.5 9.27614 0.5 9Z"
            fill="currentColor"
        />
    </Icon>
);

export default HamburgerIcon;
