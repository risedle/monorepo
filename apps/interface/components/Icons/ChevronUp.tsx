import { IconProps, Icon } from "@chakra-ui/react";

const ChevronUpIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 16 16" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8648 9.34197C11.6759 9.54343 11.3595 9.55363 11.158 9.36477L7.5 5.93536L3.84197 9.36477C3.64051 9.55363 3.32409 9.54343 3.13523 9.34197C2.94636 9.14051 2.95657 8.82409 3.15803 8.63523L7.15803 4.88523C7.35036 4.70492 7.64964 4.70492 7.84197 4.88523L11.842 8.63523C12.0434 8.82409 12.0536 9.14051 11.8648 9.34197Z"
                fill="currentColor"
            />
        </Icon>
    );
};

export default ChevronUpIcon;
