import {
    border,
    Box,
    BoxProps,
    Flex,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Dash({ children }: { children?: React.ReactNode }) {
    const borderColor = useColorModeValue("#E8E8E8", "#2E2E2E");

    if (children) {
        return (
            <Flex w="100%" alignItems="center">
                <Box
                    h="1px"
                    flex="1"
                    backgroundImage={`linear-gradient(to right, ${borderColor} 60%, rgba(255, 255, 255, 0) 0%);`}
                    backgroundSize="10px 1px"
                    order={2}
                />
                {children}
            </Flex>
        );
    }
    return (
        <HStack
            width="100%"
            h="1px"
            backgroundImage={`linear-gradient(to right, ${borderColor} 60%, rgba(255, 255, 255, 0) 0%);`}
            backgroundSize="10px 1px"
        />
    );
}

type DashTextVariant = "left" | "rigth";

type TextDashProps = {
    textPosition?: DashTextVariant;
} & BoxProps;

const TextDash = ({ textPosition = "left", ...props }: TextDashProps) => {
    const textColor = useColorModeValue("gray.light.12", "gray.dark.12 ");
    return (
        <Box
            fontFamily="inter"
            fontWeight={600}
            fontSize="sm"
            color={textColor}
            margin={textPosition === "left" ? "0 6px 0 0" : "0 0 0 6px"}
            order={textPosition === "left" ? "1" : "3"}
            alignSelf="start"
            {...props}
        >
            {props.children}
        </Box>
    );
};

export { Dash, TextDash };
