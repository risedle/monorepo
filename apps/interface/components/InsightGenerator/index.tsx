import { useRef } from "react";
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
import InsightImageDOM from "@/components/InsightImageDOM";
import domtoimage from "dom-to-image";

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
    const imageRef = useRef<HTMLDivElement>(null);

    const exportToPng = async (dom: Node) => {
        try {
            const result = await domtoimage.toPng(dom);
            const link = document.createElement("a");
            link.download = "my-image-name.jpeg";
            link.href = result;
            link.click();
        } catch (e) {
            console.log("something went wrong");
        }
    };

    return (
        <Container
            ref={containerRef}
            maxW="5xl"
            py="3"
            marginTop={{ base: "152px", laptop: "60px" }}
        >
            <Tabs variant="solid-rounded">
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
                </Flex>
                <TabPanels>
                    <TabPanel p="0" position="relative">
                        <InsightImageDOM
                            ref={imageRef}
                            type="daily"
                            containerWidth={
                                containerDimension?.contentBox.width
                            }
                        />
                    </TabPanel>
                    <TabPanel p="0">
                        <InsightImageDOM
                            ref={imageRef}
                            type="weekly"
                            containerWidth={
                                containerDimension?.contentBox.width
                            }
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default InsightGenerator;
