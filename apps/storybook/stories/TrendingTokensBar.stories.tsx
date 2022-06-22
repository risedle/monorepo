import React from "react";
import { TrendingTokensBar, FetchState } from "../../../packages/ui/src";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Risedle/Trending Tokens Bar",
    component: TrendingTokensBar,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TrendingTokensBar {...args} />;

export const Loading = Template.bind({});
Loading.args = {
    fetchState: FetchState.Loading,
};

export const Loaded = Template.bind({});
Loaded.args = {
    fetchState: FetchState.Loaded,
};

export const Failed = Template.bind({});
Failed.args = {
    fetchState: FetchState.Failed,
};
