import React, { HTMLProps, useMemo } from "react";
import { ChainIcon } from "../components/ChainIcon";
import { useViewportSize } from "../hooks/useViewportSize";
import { getChainColors } from "../utils/getChainColors";

const styles = {
    textContainer: ["flex", "flex-row", "items-center", "px-8", "gap-1"].join(
        " "
    ),
    content: ["flex", "flex-row", "divide-x", "min-w-[375px]"].join(" "),
    contentContainer: [
        "flex",
        "flex-row",
        "divide-x",
        "py-3",
        "border-b",
        "border-gray-light-4",
        "dark:border-gray-dark-4",
        "overflow-x-hidden",
    ].join(" "),
    textBase: [
        "font-semibold",
        "text-xs",
        "leading-4",
        "tracking-tight",
        "shrink-0",
    ].join(" "),
    textBaseColor: [
        "text-gray-light-11",
        "dark:text-gray-dark-11",
        "fill-gray-light-11",
        "dark:fill-gray-dark-11",
    ].join(" "),
};

type BannerContentContainer = {
    children: React.ReactNode;
} & HTMLProps<HTMLDivElement>;

function BannerContentContainer({
    children,
    ...props
}: BannerContentContainer) {
    return (
        <div {...props} className={styles.content}>
            {children}
        </div>
    );
}

type VariantBannerContent = "chain" | "base";

type BannerContentProps = {
    variant: VariantBannerContent;
    children?: React.ReactNode;
    isIcon?: boolean;
};

function BannerContent({ children }: { children: React.ReactNode }) {
    return <div className={styles.textContainer}>{children}</div>;
}

function CloseBannerButton() {
    return (
        <button
            onClick={() => {
                console.log("something");
            }}
            style={{
                minWidth: "24px",
                height: "24px",
                position: "absolute",
                right: "0px",
                top: "8px",
                background: "white",
            }}
        >
            <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );
}

function BannerItem({
    variant = "base",
    children,
    isIcon = false,
}: BannerContentProps) {
    const chainColors = getChainColors();

    const color = useMemo(() => {
        switch (variant) {
            case "base":
                return styles.textBaseColor;
            case "chain":
                return chainColors;
        }
    }, [variant]);

    if (isIcon) {
        return <ChainIcon className={`${styles.textBase} ${color}`} />;
    }

    return <div className={`${styles.textBase} ${color}`}>{children}</div>;
}

function Banner({
    children,
    closeAble = false,
}: {
    children: React.ReactNode;
    closeAble?: boolean;
}) {
    const chainColors = getChainColors();

    // Fill the current windown
    const dim = useViewportSize();
    const contentAmount = Math.round(dim.width / 375) + (closeAble ? 0 : 1);
    return (
        <div
            data-testid="WarningBar"
            className={`${styles.contentContainer} ${chainColors}`}
        >
            {Array.from(Array(contentAmount), (e, i) => {
                return children;
            })}
            <CloseBannerButton />
        </div>
    );
}

export {
    Banner,
    BannerContentContainer,
    BannerItem,
    BannerContent,
    CloseBannerButton,
};
