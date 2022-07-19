import { useViewportTablet } from "../../hooks/useViewportSize";
import Link from "next/link";

const NavigationBarLogoIcon = () => {
    return (
        <div data-testid="NavigationBarLogoIcon">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:fill-white fill-gray-light-12"
            >
                <g clipPath="url(#clip0_3328_53116)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 12.5424V11.4575C24 8.74925 23.5544 6.8164 22.7177 5.16963C21.8811 3.52283 20.6534 2.23043 19.0889 1.34972C17.5244 0.469012 15.6883 2.19737e-07 13.1153 1.02041e-07L10.8847 0C8.3118 -1.17696e-07 6.47557 0.469011 4.91114 1.34972C3.34671 2.23043 2.11892 3.52282 1.28224 5.16963C0.445583 6.81639 1.58438e-07 8.74925 4.53158e-08 11.4575L0 12.5424C-1.13122e-07 15.2508 0.445582 17.1836 1.28224 18.8304C2.11892 20.4771 3.34671 21.7695 4.91114 22.6502C6.47557 23.531 8.3118 24 10.8847 24H13.1153C15.6883 24 17.5244 23.531 19.0889 22.6502C20.6533 21.7695 21.8811 20.4771 22.7177 18.8304C23.5544 17.1836 24 15.2508 24 12.5424ZM14.0792 10.9405H14.0791C13.7467 10.8936 13.5806 10.8702 13.4618 10.7655C13.4476 10.7529 13.4339 10.7396 13.4211 10.7255C13.3135 10.6083 13.2803 10.4363 13.214 10.0922L13.0458 9.21885C12.6398 7.11045 12.4368 6.05627 12.0002 6.05627C11.5637 6.05627 11.3606 7.11045 10.9546 9.21877L10.7864 10.0922C10.7201 10.4363 10.687 10.6083 10.5794 10.7255C10.5665 10.7396 10.5528 10.7529 10.5386 10.7655C10.4199 10.8702 10.2537 10.8936 9.92122 10.9405C7.2527 11.3164 5.91841 11.5043 5.86849 11.9323C5.86323 11.9773 5.86323 12.0227 5.86849 12.0677C5.91841 12.4957 7.2527 12.6836 9.92122 13.0595C10.2537 13.1064 10.4199 13.1298 10.5386 13.2345C10.5528 13.2471 10.5665 13.2604 10.5794 13.2744C10.687 13.3917 10.7201 13.5636 10.7864 13.9078L10.9546 14.7812C11.3606 16.8895 11.5637 17.9437 12.0002 17.9437C12.4368 17.9437 12.6398 16.8895 13.0458 14.7812L13.214 13.9078C13.2803 13.5636 13.3135 13.3917 13.4211 13.2744C13.4339 13.2604 13.4476 13.2471 13.4618 13.2345C13.5806 13.1298 13.7467 13.1064 14.0791 13.0595H14.0792C16.7477 12.6836 18.082 12.4957 18.1319 12.0677C18.1372 12.0227 18.1372 11.9773 18.1319 11.9323C18.082 11.5043 16.7477 11.3164 14.0792 10.9405Z"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_3328_53116">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

interface NavigationBarProps {
    tradeActive?: boolean;
    earnActive?: boolean;
    portfolioActive?: boolean;
}

export const NavigationBar = (props: NavigationBarProps) => {
    const isTablet = useViewportTablet();

    const styles = {
        navigationBar: [
            "flex",
            "flex-row",
            "max-w-7xl",
            "container",
            "mx-auto",
            "px-4",
            "py-5",
        ].join(" "),
        navigationBarLogoContainer: ["flex-none"].join(" "),
        navigationBarLogo: ["flex", "flex-row", "gap-2", "items-center"].join(
            " "
        ),
        navigationBarLogoText: [
            "font-bold",
            "font-inter",
            "text-base",
            "leading-4",
            "tracking-tight",
        ].join(" "),
        navigationBarLinksContainer: [
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
        navigationBarLinkBase: [
            "font-normal",
            "text-sm",
            "leading-4",
            "text-gray-light-10",
            "dark:text-gray-dark-10",
        ].join(" "),
        navigationBarLinkActive: [
            "font-normal",
            "text-sm",
            "leading-4",
            "text-gray-light-12",
            "dark:text-gray-dark-12",
        ].join(" "),
    };
    // Active links
    const tradeStyles = props.tradeActive
        ? styles.navigationBarLinkActive
        : styles.navigationBarLinkBase;
    const earnStyles = props.earnActive
        ? styles.navigationBarLinkActive
        : styles.navigationBarLinkBase;
    const portfolioStyles = props.portfolioActive
        ? styles.navigationBarLinkActive
        : styles.navigationBarLinkBase;

    return (
        <div data-testid="NavigationBar" className={styles.navigationBar}>
            <div
                data-testid="NavigationBarLogo"
                className={styles.navigationBarLogoContainer}
            >
                <a
                    href="https://risedle.com"
                    className={styles.navigationBarLogo}
                >
                    <NavigationBarLogoIcon />
                    {/* Show text only on tablet or larger */}
                    {isTablet && (
                        <div
                            data-testid="NavigationBarLogoText"
                            className={styles.navigationBarLogoText}
                        >
                            Risedle
                        </div>
                    )}
                </a>
            </div>
            <div
                data-testid="NavigationBarLinks"
                className={styles.navigationBarLinksContainer}
            >
                <Link href="/trade">
                    <a
                        data-testid="NavigationBarLinksTrade"
                        className={tradeStyles}
                    >
                        Trade
                    </a>
                </Link>
                <Link href="/pools">
                    <a
                        data-testid="NavigationBarLinksEarn"
                        className={earnStyles}
                    >
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
        </div>
    );
};

export default NavigationBar;
