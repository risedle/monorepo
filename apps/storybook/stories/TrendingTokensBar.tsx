/**
 * This dummy content is required in order to storybook infer the ArgsTable
 */
import React from "react";
import { TrendingTokensBar as Component } from "@risedle/ui";

console.log("DEBUGG", Component);

export const TrendingTokensBar = Component;

export const Hello = () => {
    return (
        <div className="bg-red-500 text-3xl font-bold underline">Helloooo</div>
    );
};
