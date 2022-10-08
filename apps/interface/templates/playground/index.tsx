import React from "react";

// Components
import Interactive from "@/atoms/interactive";
import ConnectButton from "@/molecules/connect-button";

interface TemplateProps {
    title: string;
}

const Template = (props: TemplateProps) => {
    const { title } = props;

    return (
        <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="/static/dist/style.css" />
                <script defer src="/static/dist/home.js"></script>
            </head>
            <body>
                <p>Home</p>
                <Interactive name="ConnectButton">
                    <ConnectButton />
                </Interactive>
            </body>
        </html>
    );
};

export default Template;
