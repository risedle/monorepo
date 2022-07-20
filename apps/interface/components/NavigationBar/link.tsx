import {
    Link as ChakraLink,
    LinkProps,
    useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavigationBarLinkProps extends LinkProps {
    children?: string | React.ReactNode;
    to: string;
    activeProps?: LinkProps;
    _hover?: LinkProps;
}

function NavigationBarLink({
    to,
    activeProps,
    children,
    ...props
}: NavigationBarLinkProps) {
    const router = useRouter();
    const isActive = router.pathname === to;

    const baseColor = useColorModeValue("gray.light.10", "gray.dark.10");
    const activeColor = useColorModeValue("gray.light.12", "gray.dark.12");

    if (isActive) {
        return (
            <Link href={to} passHref>
                <ChakraLink
                    {...props}
                    {...activeProps}
                    _hover={{ color: activeColor }}
                    color={activeColor}
                    data-state="active"
                >
                    {children}
                </ChakraLink>
            </Link>
        );
    }

    return (
        <Link href={to} passHref>
            <ChakraLink
                {...props}
                _hover={{ color: activeColor }}
                color={baseColor}
            >
                {children}
            </ChakraLink>
        </Link>
    );
}

export default NavigationBarLink;
