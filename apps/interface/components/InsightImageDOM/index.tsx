import {
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
import React, { useImperativeHandle, useRef } from "react";
import useGetInsight from "@/hooks/useGetInsight";
import dayjs from "dayjs";

interface InsightImageDOMProps extends FlexProps {
    type: "daily" | "weekly";
    containerWidth: number | undefined;
}

export type ImageHandle = {
    getImage: () => Node;
};

// eslint-disable-next-line react/display-name
const InsightImageDOM = React.forwardRef(
    (props: InsightImageDOMProps, ref) => {
        const imageRef = useRef<HTMLDivElement>(null);
        const exportImage = async () => {
            try {
                if (imageRef.current && data) {
                    const result = await domtoimage.toJpeg(imageRef.current);
                    const link = document.createElement("a");
                    link.download = `${props.type} ${dayjs(
                        data[0].dailyGain.timestamp * 1000
                    ).format("DD-MM-YY")}.jpeg`;
                    link.href = result;
                    link.click();
                }
            } catch (e) {
                console.log("something went wrong");
            }
        };

        useImperativeHandle(ref, () => ({
            getImage() {
                exportImage();
            },
        }));

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
                    <div ref={imageRef}>
                        <Flex
                            // ref={ref as LegacyRef<HTMLDivElement> | undefined}
                            direction="row"
                            justifyContent="space-between"
                            background="#0A0A0C"
                            width="1200px"
                            height="627px"
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
                                <Flex
                                    direction="row"
                                    gap="3"
                                    alignItems="center"
                                >
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
                                        {dayjs(
                                            data[0].dailyGain.timestamp * 1000
                                        ).format("DD MMMM YYYY - HH:MMA")}
                                    </Text>
                                    <Text
                                        color="#D9D9D9"
                                        fontSize="7xl"
                                        fontWeight="extrabold"
                                        lineHeight="80px"
                                    >
                                        {description[type]} Top <br />{" "}
                                        Performers
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
    }
);

export default InsightImageDOM;
