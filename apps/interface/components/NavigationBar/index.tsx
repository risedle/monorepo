import { NavigationBarLogo } from "./logo";
import { NavigationBarLinks } from "./links";
// import { NavigationBarChainSwitcher } from "./chain";

interface NavigationBarProps {
    tradeActive?: boolean;
    earnActive?: boolean;
    portfolioActive?: boolean;
}

export const NavigationBar = (props: NavigationBarProps) => {
    const styles = {
        container: [
            "flex",
            "flex-row",
            "max-w-7xl",
            "container",
            "mx-auto",
            "px-4",
            "py-3",
            "items-center",
        ].join(" "),
    };

    return (
        <div data-testid="NavigationBar" className={styles.container}>
            <NavigationBarLogo />
            <NavigationBarLinks {...props} />
        </div>
    );
};

export default NavigationBar;
