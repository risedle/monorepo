import { Divider, Flex, FlexProps, Text } from "@chakra-ui/react";
import { RisedleLogo, BscLogo } from "./logo";

interface InsightImageDOMProps extends FlexProps {
    type: "daily" | "weekly";
    containerWidth: number | undefined;
}

const InsightImageDOM = (props: InsightImageDOMProps) => {
    const { type, containerWidth, ...restProps } = props;
    const description = {
        daily: "24H",
        weekly: "Weekly",
    };
    const dummyData = [
        {
            name: "BNBDROP",
            price: 34.25,
            gain: 53.25,
        },
        {
            name: "CAKEDROP",
            price: 27.25,
            gain: 44.25,
        },
        {
            name: "BNBRISE",
            price: 123.25,
            gain: -34.25,
        },
        {
            name: "CAKERISE",
            price: 44.25,
            gain: -14.25,
        },
    ];
    return (
        <Flex
            direction="row"
            justifyContent="space-between"
            background="#0A0A0C"
            width="1200px"
            height="627px"
            borderRadius="3xl"
            transform={`scale(${containerWidth ? containerWidth / 1200 : 1})`}
            transformOrigin="top left"
            {...restProps}
        >
            {/* Left side */}
            <Flex
                direction="column"
                justifyContent="space-between"
                py="16"
                pl="20"
            >
                {/* Header */}
                <Flex direction="row" gap="3" alignItems="center">
                    <RisedleLogo />
                    <Text fontSize="4xl" lineHeight="0" color="#D9D9D9">
                        &middot;
                    </Text>
                    <BscLogo />
                </Flex>
                {/* Description */}
                <Flex direction="column" gap="8">
                    <Text
                        color="white"
                        opacity="0.5"
                        fontSize="base"
                        lineHeight="5"
                        fontWeight="medium"
                    >
                        18 August 2022 - 12:00PM
                    </Text>
                    <Text
                        color="#D9D9D9"
                        fontSize="7xl"
                        fontWeight="extrabold"
                        lineHeight="80px"
                    >
                        {description[type]} Top <br /> Performers
                    </Text>
                </Flex>
            </Flex>

            {/* Right side */}
            <Flex
                width="508px"
                direction="column"
                justifyContent="end"
                borderLeft="1px solid rgba(255, 255, 255, 0.06)"
            >
                <Divider borderColor="rgba(255, 255, 255, 0.06)" />
                <Flex direction="column" pb="8" pt="18px" gap="18px">
                    {dummyData.map((item, index) => {
                        return (
                            <>
                                <Flex
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    fontSize="xl"
                                    lineHeight="5"
                                    color="#D9D9D9"
                                    py="2"
                                    px="8"
                                >
                                    <Flex gap="6" alignItems="center">
                                        {/* Index */}
                                        <Flex
                                            alignItems="center"
                                            justifyContent="center"
                                            h="8"
                                            w="8"
                                            background="rgba(255, 255, 255, 0.03)"
                                            borderRadius="lg"
                                        >
                                            <Text
                                                color="white"
                                                fontSize="medium"
                                                fontWeight="bold"
                                                opacity="0.6"
                                            >
                                                {index + 1}
                                            </Text>
                                        </Flex>
                                        {/* Token Symbol */}
                                        <Text fontWeight="bold">
                                            {item.name}
                                        </Text>
                                    </Flex>
                                    <Flex gap="6">
                                        {/* Price */}
                                        <Text color="white" opacity="0.6">
                                            ${item.price}
                                        </Text>
                                        {/* Gain Percent */}
                                        <Text
                                            color={
                                                item.gain >= 0
                                                    ? "#2EE5B9"
                                                    : "#E5442E"
                                            }
                                        >
                                            {item.gain >= 0 && "+"}
                                            {item.gain}%
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Divider borderColor="rgba(255, 255, 255, 0.06)" />
                            </>
                        );
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default InsightImageDOM;
