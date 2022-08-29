import useGetInsight from "@/hooks/useGetInsight";
import {
    Button,
    Center,
    Divider,
    Flex,
    FlexProps,
    Heading,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { RisedleLogo, BscLogo } from "./logo";
import domtoimage from "dom-to-image";
import React, { useRef } from "react";
interface InsightImageDOMProps extends FlexProps {
    type: "daily" | "weekly";
    containerWidth: number | undefined;
}

// eslint-disable-next-line react/display-name
const InsightImageDOM = React.forwardRef((props: InsightImageDOMProps) => {
    const imageRef = useRef<HTMLDivElement>(null);

    const exportToPng = async (dom: Node) => {
        try {
            const result = await domtoimage.toPng(dom, {
                // height: 627,
                // width: 1000,
            });
            const link = document.createElement("a");
            link.download = "my-image-name.jpeg";
            link.href = result;
            link.click();
        } catch (e) {
            console.log("something went wrong");
        }
    };

    const { type, ...restProps } = props;
    const { data, isLoaded, error } = useGetInsight();
    const description = {
        daily: "24H",
        weekly: "Weekly",
    };

    if (!isLoaded) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    if (error) {
        return (
            <Center>
                <Heading size="md">Something Went Wrong</Heading>
                <Text>{error.message}</Text>
            </Center>
        );
    }

    if (data) {
        return (
            <>
                <Button
                    onClick={() => {
                        if (imageRef.current) {
                            exportToPng(imageRef.current);
                        }
                    }}
                    variant="bsc"
                    paddingX="6"
                    paddingY="3"
                >
                    Generate
                </Button>
                <div ref={imageRef}>
                    <Flex
                        // ref={ref as LegacyRef<HTMLDivElement> | undefined}
                        direction="row"
                        justifyContent="space-between"
                        background="#0A0A0C"
                        width="2400px"
                        height="1254px"
                        {...restProps}
                    >
                        {/* Left side */}
                        <Flex
                            direction="column"
                            justifyContent="space-between"
                            grow="1"
                            py="16"
                            pl="20"
                            backgroundImage="url(/shareable/dot-background.svg)"
                            backgroundRepeat="no-repeat"
                            backgroundPosition="center top"
                        >
                            {/* Header */}
                            <Flex direction="row" gap="3" alignItems="center">
                                <RisedleLogo />
                                <Text
                                    fontSize="4xl"
                                    lineHeight="0"
                                    color="#D9D9D9"
                                >
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
                            <Flex
                                justifyContent="center"
                                grow="1"
                                backgroundImage="url(/shareable/bsc-background.svg)"
                                backgroundRepeat="no-repeat"
                                backgroundPosition="center 37%"
                            />
                            <Divider borderColor="rgba(255, 255, 255, 0.06)" />
                            <Flex
                                direction="column"
                                pb="8"
                                pt="18px"
                                gap="18px"
                            >
                                {data.map((item, index) => {
                                    const rank = index + 1;
                                    const gain =
                                        props.type === "daily"
                                            ? item.dailyGain.gain
                                            : item.weeklyGain.gain;
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
                                                <Flex
                                                    gap="6"
                                                    alignItems="center"
                                                >
                                                    {/* Index */}
                                                    <Flex
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        h="8"
                                                        w="8"
                                                        background={
                                                            rank !== 1
                                                                ? `rgba(255, 255, 255, 0.03)`
                                                                : "transparent"
                                                        }
                                                        backgroundImage={
                                                            rank === 1
                                                                ? "url(/shareable/star-icon.svg)"
                                                                : "none"
                                                        }
                                                        borderRadius="lg"
                                                    >
                                                        <Text
                                                            color={
                                                                rank === 1
                                                                    ? "black"
                                                                    : "white"
                                                            }
                                                            fontSize="medium"
                                                            fontWeight="bold"
                                                            opacity={
                                                                rank === 1
                                                                    ? "1"
                                                                    : "0.6"
                                                            }
                                                        >
                                                            {rank}
                                                        </Text>
                                                    </Flex>
                                                    {/* Token Symbol */}
                                                    <Text fontWeight="bold">
                                                        {item.name}
                                                    </Text>
                                                </Flex>
                                                <Flex gap="6">
                                                    {/* Price */}
                                                    {/* <Text color="white" opacity="0.6">
                                                ${item.}
                                            </Text> */}
                                                    {/* Gain Percent */}
                                                    <Text
                                                        color={
                                                            gain >= 0
                                                                ? "#2EE5B9"
                                                                : "#E5442E"
                                                        }
                                                    >
                                                        {gain >= 0 && "+"}
                                                        {gain.toFixed(2)}%
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
                </div>
            </>
        );
    }
    return null;
});

export default InsightImageDOM;
