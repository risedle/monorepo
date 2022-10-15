/**
 * Link
 *
 * Link renders Anchor HTML tag.
 */
import React from "react";

import type { UtilityProps } from "~/atoms/box/utilities";
import Box from "~/atoms/box";

export default function Link(
    props: React.ComponentPropsWithoutRef<"a"> & UtilityProps
) {
    return <Box as="a" {...props} />;
}
