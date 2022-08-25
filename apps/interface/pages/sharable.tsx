import type { NextPage } from "next";
import { NavigationBar } from "@/components/NavigationBar";
import { NavigationBarBottom } from "@/components/NavigationBarBottom";
import { FooterBar } from "@/components/FooterBar";
import InsightGenerator from "@/components/InsightGenerator";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SharableProps {}

const Sharable: NextPage<SharableProps> = () => {
    return (
        <>
            <NavigationBar />
            <NavigationBarBottom />
            <InsightGenerator />
            <FooterBar />
        </>
    );
};

export default Sharable;
