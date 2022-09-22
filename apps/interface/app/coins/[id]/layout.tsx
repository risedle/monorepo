interface LayoutPropsParams {
    id: string;
}

interface LayoutProps {
    children: ReactNode;
    params: LayoutPropsParams;
}

export default function Layout(props: LayoutPropsParams) {
    console.log("DEBUG: coins/id props", props);
    const { params } = props;
    const test = "OK";

    return (
        <html lang="en">
            <head>
                <title>Coin {"etest"}</title>
                <meta name="description" content={test} />
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body>
                <header>This is header</header>
                <main>This is main</main>
                <footer>This is footer</footer>
            </body>
        </html>
    );
}
