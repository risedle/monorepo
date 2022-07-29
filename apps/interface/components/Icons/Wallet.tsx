import { Icon, IconProps } from "@chakra-ui/react";

export const WalletIcon = (props: IconProps) => (
    <Icon viewBox="0 0 16 16" {...props}>
        <path
            d="M2.5 4V12C2.5 12.2652 2.60536 12.5196 2.79289 12.7071C2.98043 12.8946 3.23478 13 3.5 13H13.5C13.6326 13 13.7598 12.9473 13.8536 12.8536C13.9473 12.7598 14 12.6326 14 12.5V5.5C14 5.36739 13.9473 5.24021 13.8536 5.14645C13.7598 5.05268 13.6326 5 13.5 5H3.5C3.23478 5 2.98043 4.89464 2.79289 4.70711C2.60536 4.51957 2.5 4.26522 2.5 4ZM2.5 4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0%"
        />
        <path
            d="M11.25 9.75C11.6642 9.75 12 9.41421 12 9C12 8.58579 11.6642 8.25 11.25 8.25C10.8358 8.25 10.5 8.58579 10.5 9C10.5 9.41421 10.8358 9.75 11.25 9.75Z"
            fill="currentColor"
        />
    </Icon>
);

export default WalletIcon;