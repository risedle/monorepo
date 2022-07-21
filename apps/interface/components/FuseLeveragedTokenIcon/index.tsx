import Image from "next/image";
import { useColorMode } from "@chakra-ui/react";

interface FuseLeveragedTokenIconProps {
    symbol: string;
    name: string;
}

export const FuseLeveragedTokenIcon = (props: FuseLeveragedTokenIconProps) => {
    const { symbol, name } = props;
    const { colorMode } = useColorMode();

    return (
        <Image
            src={`/icons/${symbol}-${colorMode}.svg`}
            width="48px"
            height="48px"
            alt={name}
        />
    );
};
