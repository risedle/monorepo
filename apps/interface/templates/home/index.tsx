import React from "react";

// Layouts
import Container from "@/atoms/container";
import Flex from "@/atoms/flex";
import FlexItem from "@/atoms/flex/item";

// Components
import Interactive from "@/atoms/interactive";
import ConnectButton from "@/molecules/connect-button";
import Box from "@/atoms/box";

interface TemplateProps {
    title: string;
}

const Template = (props: TemplateProps) => {
    const { title } = props;

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{title}</title>

                <link rel="stylesheet" href="/static/dist/global.css" />
                <script defer src="/static/dist/client.home.js"></script>
            </head>
            <body>
                <Container as="nav">
                    <Flex as="ul" justify="between">
                        <FlexItem as="li">Logo test</FlexItem>
                        <FlexItem as="li">Button</FlexItem>
                    </Flex>
                </Container>
                <Box>OK</Box>
            </body>
        </html>
    );
};

export default Template;
