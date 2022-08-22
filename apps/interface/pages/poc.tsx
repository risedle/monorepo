import { Box, Button, Heading } from "@chakra-ui/react";
import domtoimage from "dom-to-image";
import { useRef } from "react";

export default function POC() {
    const container = useRef(null);

    const exportPNG = async (dom: Node) => {
        try {
            const result = await domtoimage.toJpeg(dom);
            const link = document.createElement("a");
            link.download = "my-image-name.jpeg";
            link.href = result;
            link.click();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {/* set width and height here */}
            <Box ref={container} width={200} height={400}>
                {/* set design implementation here */}
                <Heading>POC</Heading>
            </Box>

            <Button
                onClick={() => {
                    if (container.current) {
                        exportPNG(container.current);
                    }
                }}
            >
                Export
            </Button>
        </>
    );
}
