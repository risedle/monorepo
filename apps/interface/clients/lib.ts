/**
 * Client Libs
 *
 * A list of commonly used functions in clients
 */
import React, { Component } from "react";
import { hydrateRoot } from "react-dom/client";

/**
 * Given pair of (component name, component), `hydrate` will look up all
 * server-rendered intractive component then hydrate it one by one.
 * */
export function hydrate(components: Map<string, Component>) {
    document.querySelectorAll("[data-risedle-component]").forEach((root) => {
        const name = root.dataset.risedleComponent;
        const Component = components[name];

        if (!Component) {
            console.warn(
                `Found a server-rendered Interactive Component for ${name} but that component was not passed to hydrate`
            );
            return;
        }

        const props = root.dataset.risedleProps;
        const hydrationProps = JSON.parse(props);
        hydrateRoot(root, React.createElement(Component, hydrationProps));
    });
}
