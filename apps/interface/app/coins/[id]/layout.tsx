import type { ReactNode } from "react";

import Header from "@/organisms/Header";

interface LayoutPropsParams {
    id: string;
}

interface LayoutProps {
    children: ReactNode;
    params: LayoutPropsParams;
}

export default function Layout(props: LayoutProps) {
    console.log("DEBUG: props", props);
    const { children, params } = props;
    const test = "OK";

    return (
        <html>
            <head>
                <title>OK</title>
            </head>
            <body>
                <Header />
            </body>
        </html>
    );
}

export const config = {
    revalidate: 0,
};
