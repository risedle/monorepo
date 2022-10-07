/**
 * Risedle's Interactive Component Wrapper
 *
 * This component is used to wrap any component that requires client hydration.
 *
 * Usage:
 *
 *      <Interactive name="SomeInteractiveComponent">
 *          <SomeInteractiveComponent />
 *      </Interactive>
 *
 * Then import the component to the entrypoint client files
 * (e.g. clients/home.ts):
 *
 *
 *      import SomeInteractiveComponent from "@/atoms/component";
 *
 *      hydrate({SomeInteractiveComponent});
 *
 */
import type { ReactNode } from "react";
import React from "react";

interface InteractiveProps {
    children: ReactNode;
    name: string;
}

const Interactive = (props: InteractiveProps) => {
    const { children, name } = props;
    // This is used to hydrate the props on the client side
    const props = JSON.stringify(React.Children.only(children).props);

    return (
        <div data-risedle-component="{name}" data-risedle-props="{props}">
            {children}
        </div>
    );
};

export default Interactive;
