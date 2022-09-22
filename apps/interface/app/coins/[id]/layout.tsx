import type { ReactNode } from "react";

import { Header } from "./header";

interface LayoutPropsParams {
    id: string;
}

interface LayoutProps {
    children: ReactNode;
    params: LayoutPropsParams;
}

export default function Layout(props: LayoutProps) {
    const { params } = props;
    const test = "OK";

    return (
        <html lang="en">
            <head>
                <title>{`Coin ${params.id}`}</title>
                <meta name="description" content={test} />
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body>
                <Header />
                <main>This is main</main>
                <footer>This is footer</footer>
            </body>
        </html>
    );
}

export const config = {
    revalidate: 0,
};
