import React from "react";
import Box from "@/atoms/box";

export default function Link(props) {
    return <Box as="a">{props.children}</Box>;
}
