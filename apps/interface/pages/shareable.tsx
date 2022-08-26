import type { NextPage } from "next";
import { NavigationBar } from "@/components/NavigationBar";
import { FooterBar } from "@/components/FooterBar";
import InsightGenerator from "@/components/InsightGenerator";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ShareableProps {}

const Shareable: NextPage<ShareableProps> = () => {
    return (
        <>
            <NavigationBar />
            <InsightGenerator />
            <FooterBar />
        </>
    );
};

export default Shareable;
