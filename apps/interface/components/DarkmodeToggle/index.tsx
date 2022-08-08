import { Button, useColorMode, Circle } from "@chakra-ui/react";

import DarkmodeIcon from "@/components/Icons/Darkmode";
import LightmodeIcon from "@/components/Icons/Lightmode";

export const DarkmodeToggle = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Button
            data-testid="DarkmodeToggle"
            onClick={toggleColorMode}
            variant="icon"
        >
            <Circle size="40px">
                {colorMode === "dark" ? <DarkmodeIcon /> : <LightmodeIcon />}
            </Circle>
        </Button>
    );
};
