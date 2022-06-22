import type { FunctionComponent } from "react";
import { TokenInfo } from "@risedle/types/token";
import Link from "next/link";

/**
 * `FetchState` represent the data fetching state of the `TrendingTokensBar`
 * component. The fetching state is managed by the stateful component
 * `TrendingTokensBarContainer`
 **/
export enum FetchState {
    Loading,
    Loaded,
    Failed,
}

/**
 * TrendingTokensBarProps is a React Component properties that passed to
 * React Component TrendingTokensBar
 */
export interface TrendingTokensBarProps {
    /**
     * The fetch state passed by `TrendingTokensBarContainer` that responsible
     * to fetch data.
     */
    fetchState: FetchState;

    /**
     * List of `TokenInfo`
     */
    tokens: Array<TokenInfo>;
}

/**
 * `TrendingTokensBar` is a stateless/presentational component.
 *
 * - It doesn't know how to fetch `TokenInfo` data.
 * - It only know how to display them as Trending Tokens Bar.
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
export const TrendingTokensBar: FunctionComponent<TrendingTokensBarProps> = ({
    fetchState,
    tokens,
}) => {
    console.log("DEBUG: ", fetchState);
    switch (fetchState) {
        case FetchState.Loading:
            return <div>Loading</div>;
        case FetchState.Loaded:
            return <div>Loaded</div>;
        case FetchState.Failed:
            return <div>Failed</div>;
        default:
            return <div>Loading</div>;
    }
};
