import { TokenInfo } from "@risedle/types";
// import Link from "next/link";

export interface TrendingTokensBarProps {
    /**
     * List of `TokenInfo`
     */
    tokens?: Array<TokenInfo>;
}

export const TrendingTokensBar = (props: TrendingTokensBarProps) => {
    return <div className="bg-red-500 w-screen">OK</div>;
};
