import React from "react";

// Components
import Interactive from "~/atoms/interactive";
import ConnectButton from "~/molecules/connect-button";

interface TemplateProps {
    title: string;
}

const Template = (props: TemplateProps) => {
    const { title } = props;

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{title}</title>
                <link rel="stylesheet" href="/static/dist/style.css" />
                <script defer src="/static/dist/home.js"></script>
            </head>
            <body>
                <header>
                    <h1>Risedle Components</h1>
                    <p>Component playground</p>
                </header>
                <section></section>
                <p>Home</p>
                <Interactive name="ConnectButton">
                    <ConnectButton />
                </Interactive>
            </body>
        </html>
    );
};

export default Template;
