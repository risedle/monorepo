/*****************************************************************************
 * Playground Component Page
 *
 * This templates render the following HTTP request:
 *
 *  GET /playground/[slug]
 *
 * Where `[slug]` is the component name.
 *
 * For example:
 * 1. `atoms/link/docs.mdx` will be accessible at `/playground/link`
 * 2. `molecules/logo/docs.mdx` will be accessible at `playground/logo`
 *
 ****************************************************************************/

import React from "react";

interface TemplateProps {
    title: string;
    description: string;
    content: string;
}

const Template = (props: TemplateProps) => {
    const { title, content } = props;

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{title}</title>
                <link rel="stylesheet" href="/static/dist/global.css" />
            </head>
            <body>
                <div
                    id="root"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </body>
        </html>
    );
};

export default Template;
