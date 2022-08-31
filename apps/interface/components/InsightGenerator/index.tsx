import { useRef, useState } from "react";
import {
    Container,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
    Button,
    useDimensions,
} from "@chakra-ui/react";
import InsightImageDOM, { ImageHandle } from "@/components/InsightImageDOM";

const InsightGenerator = () => {
    const tabsColor = useColorModeValue("gray.light.3", "gray.dark.2");
    const tabColor = useColorModeValue("gray.light.1", "gray.dark.3");
    const tabTextColor = useColorModeValue("gray.light.10", "gray.dark.10");
    const tabTextColorSelected = useColorModeValue(
        "gray.light.12",
        "gray.dark.12"
    );
    const containerRef = useRef(null);
    const containerDimension = useDimensions(containerRef, true);
    const imageRef = useRef<ImageHandle>(null);
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Container
            maxW="5xl"
            py="3"
            marginTop={{ base: "152px", laptop: "60px" }}
        >
            <Tabs
                onChange={(index) => setTabIndex(index)}
                variant="solid-rounded"
            >
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="8"
                >
                    <TabList background={tabsColor} borderRadius="xl">
                        <Tab
                            borderRadius="lg"
                            paddingX="5"
                            paddingY="3"
                            color={tabTextColor}
                            fontSize="sm"
                            lineHeight="4"
                            letterSpacing="-0.02em"
                            fontWeight="normal"
                            _selected={{
                                background: tabColor,
                                color: tabTextColorSelected,
                                fontWeight: "semibold",
                            }}
                        >
                            Daily
                        </Tab>
                        <Tab
                            borderRadius="lg"
                            paddingX="5"
                            paddingY="3"
                            color={tabTextColor}
                            fontSize="sm"
                            lineHeight="4"
                            letterSpacing="-0.02em"
                            fontWeight="normal"
                            _selected={{
                                background: tabColor,
                                color: tabTextColorSelected,
                                fontWeight: "semibold",
                            }}
                        >
                            Weekly
                        </Tab>
                    </TabList>
                    <Button
                        onClick={async () => {
                            if (imageRef?.current?.getImage) {
                                imageRef.current.getImage();
                            }
                        }}
                        variant="bsc"
                        paddingX="6"
                        paddingY="3"
                    >
                        Generate
                    </Button>
                </Flex>
                <TabPanels>
                    <TabPanel p="0" position="relative">
                        {tabIndex === 0 && (
                            <InsightImageDOM
                                ref={imageRef}
                                type="daily"
                                containerWidth={
                                    containerDimension?.contentBox.width
                                }
                            />
                        )}
                    </TabPanel>
                    <TabPanel p="0">
                        {tabIndex === 1 && (
                            <InsightImageDOM
                                ref={imageRef}
                                type="weekly"
                                containerWidth={
                                    containerDimension?.contentBox.width
                                }
                            />
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default InsightGenerator;
