import {
    Center,
    Divider,
    Flex,
    FlexProps,
    Heading,
    Spinner,
    Text,
} from "@chakra-ui/react";
import domtoimage from "dom-to-image";
import React, { useImperativeHandle, useRef } from "react";
import dayjs from "dayjs";

import { RisedleLogo, BscLogo } from "./logo";
import useGetInsight from "@/hooks/useGetInsight";

interface InsightImageDOMProps extends FlexProps {
    type: "daily" | "weekly";
}

export type ImageHandle = {
    getImage: () => Node;
};

// Given html element and filename, export html element to downloadble filename
export async function exportImage(
    element: HTMLElement | null,
    filename: string
): Promise<void> {
    if (element) {
        const result = await domtoimage.toJpeg(element);
        const link = document.createElement("a");
        link.className = "download-helper";
        link.download = filename;
        link.href = result;
        link.click();
    } else {
        alert("Element is null");
    }
}

// eslint-disable-next-line react/display-name
const InsightImageDOM = React.forwardRef(
    (props: InsightImageDOMProps, ref) => {
        const { type, ...restProps } = props;
        const { data, isLoaded, error } = useGetInsight();
        const description = {
            daily: "24H",
            weekly: "Weekly",
        };
        const imageRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getImage() {
                let timestamp = data?.[0].dailyGain.timestamp;
                if (timestamp == undefined) {
                    timestamp = Math.floor(Date.now() / 1000);
                }
                const filename = `${props.type} ${dayjs(
                    timestamp * 1000
                ).format("DD-MM-YY")}.jpeg`;
                exportImage(imageRef.current, filename);
            },
        }));

        if (error) {
            return (
                <Center data-testid="ErrorInsightGenerator">
                    <Heading size="md">Something Went Wrong</Heading>
                    <Text>{error.message}</Text>
                </Center>
            );
        }

        if (isLoaded && data) {
            return (
                <>
                    <div data-testid="InsightGeneratorDiv" ref={imageRef}>
                        <Flex
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
                                            <div
                                                key={`${item.dailyGain.gain} ${index}`}
                                            >
                                                <Flex
                                                    key={`${item.dailyGain.gain} ${index}`}
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
                                            </div>
                                        );
                                    })}
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </>
            );
        }
        return (
            <Center data-testid="LoadingInsightGenerator">
                <Spinner />
            </Center>
        );
    }
);

export default InsightImageDOM;
