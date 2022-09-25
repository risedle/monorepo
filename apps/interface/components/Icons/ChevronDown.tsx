import { Icon, IconProps } from "@chakra-ui/react";

const ChevronDownIcon = (props: IconProps) => (
    <Icon viewBox="0 0 16 16" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8648 6.65803C11.6759 6.45657 11.3595 6.44637 11.158 6.63523L7.5 10.0646L3.84197 6.63523C3.64051 6.44637 3.3241 6.45657 3.13523 6.65803C2.94636 6.85949 2.95657 7.17591 3.15803 7.36477L7.15803 11.1148C7.35036 11.2951 7.64964 11.2951 7.84197 11.1148L11.842 7.36477C12.0434 7.17591 12.0536 6.85949 11.8648 6.65803Z"
            fill="currentColor"
        />
    </Icon>
);

export default ChevronDownIcon;
