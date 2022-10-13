import React from "react";

// Layouts
import Container from "~/atoms/container";
import Flex from "~/atoms/flex";
import Box from "~/atoms/box";

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
            </head>
            <body>
                <Container as="nav">
                    <Flex as="ul" justify="between">
                        <Box as="li">Logo test</Box>
                        <Box as="li">Button</Box>
                    </Flex>
                </Container>
            </body>
        </html>
    );
};

export default Template;
