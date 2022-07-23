import { Icon, IconProps } from "@chakra-ui/react";

export const CloseIcon = (props: IconProps) => (
    <Icon data-testid="CloseIcon" viewBox="0 0 16 16" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3536 3.35355C13.5488 3.15829 13.5488 2.84171 13.3536 2.64645C13.1583 2.45118 12.8417 2.45118 12.6464 2.64645L8 7.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L7.29289 8L2.64645 12.6464C2.45118 12.8417 2.45118 13.1583 2.64645 13.3536C2.84171 13.5488 3.15829 13.5488 3.35355 13.3536L8 8.70711L12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L8.70711 8L13.3536 3.35355Z"
            fill="currentColor"
        />
    </Icon>
);

export default CloseIcon;
