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
import type { ReactElement } from "react";
import React from "react";

interface InteractiveProps {
    children?: ReactElement;
    name: string;
}

const Interactive = (props: InteractiveProps) => {
    const { children, name } = props;
    if (!children) {
        throw new Error("Interactive: Child not found");
    }
    const childProps = React.Children.only(children).props;
    const hydrationProps = JSON.stringify(childProps);
    return (
        <div data-risedle-component={name} data-risedle-props={hydrationProps}>
            {children}
        </div>
    );
};

export default Interactive;
