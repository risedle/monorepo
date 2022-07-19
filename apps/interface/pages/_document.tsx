import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

class RisedleDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="dark overflow-x-hidden font-inter">
                <Head></Head>
                <body className="min-h-screen bg-gray-light-1 dark:bg-gray-dark-1">
                    <ColorModeScript initialColorMode="dark" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default RisedleDocument;
