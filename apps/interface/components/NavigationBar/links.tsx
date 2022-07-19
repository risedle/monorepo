import Link from "next/link";

interface NavigationBarLinksProps {
    tradeActive?: boolean;
    earnActive?: boolean;
    portfolioActive?: boolean;
}

export const NavigationBarLinks = (props: NavigationBarLinksProps) => {
    const styles = {
        container: [
            "flex",
            "flex-row",
            "flex-auto",
            "justify-center",
            "sm:justify-start",
            "items-center",
            "gap-4",
            "sm:gap-8",
            "sm:pl-12",
        ].join(" "),
        defaultStyles: [
            "font-normal",
            "text-sm",
            "leading-4",
            "text-gray-light-10",
            "dark:text-gray-dark-10",
        ].join(" "),
        activeStyles: [
            "font-normal",
            "text-sm",
            "leading-4",
            "text-gray-light-12",
            "dark:text-gray-dark-12",
        ].join(" "),
    };

    // Active links
    const tradeStyles = props.tradeActive
        ? styles.activeStyles
        : styles.defaultStyles;
    const earnStyles = props.earnActive
        ? styles.activeStyles
        : styles.defaultStyles;
    const portfolioStyles = props.portfolioActive
        ? styles.activeStyles
        : styles.defaultStyles;

    return (
        <div data-testid="NavigationBarLinks" className={styles.container}>
            <Link href="/trade">
                <a
                    data-testid="NavigationBarLinksTrade"
                    className={tradeStyles}
                >
                    Trade
                </a>
            </Link>
            <Link href="/pools">
                <a data-testid="NavigationBarLinksEarn" className={earnStyles}>
                    Earn
                </a>
            </Link>
            <Link href="/portfolio">
                <a
                    data-testid="NavigationBarLinksPortfolio"
                    className={portfolioStyles}
                >
                    Portfolio
                </a>
            </Link>
        </div>
    );
};
