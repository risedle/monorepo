import React from "react";

interface LayoutProps {
    title: string;
}

const Layout = (props: LayoutProps) => {
    const { title } = props;

    return (
        <html>
            <head>
                <title>{title}</title>
            </head>
            <body>
                <p>Home</p>
            </body>
        </html>
    );
};

export default Layout;
