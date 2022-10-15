import React from "react";

import type { BoxProps } from "~/atoms/box";
import Box from "~/atoms/box";

export default function Link(props: BoxProps) {
    console.log("DEBUG: Link", props);
    return <Box as="a" {...props} />;
}
