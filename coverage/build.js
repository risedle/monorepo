// Collect coverage and list them in this folder
const glob = require("glob");
const fse = require("fs-extra");
const Mustache = require("mustache");

const index = `
<!doctype html>
<html>
<head>
    <title>Risedle Monorepo Coverage</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <ul>
        {{#sources}}
            <li>
                <a href="/{{{.}}}/index.html">
                    {{{.}}}
                </a>
            </li>
        {{/sources}}
    </ul>
</body>
</html>
`;

// options is optional
glob(
    "**/coverage/lcov-report",
    { ignore: "node_modules/**" },
    function (er, files) {
        files.forEach((srcDir) => {
            const destDir = "coverage/" + srcDir;
            fse.copySync(srcDir, destDir, { overwrite: true | false });
        });
        const output = Mustache.render(index, { sources: files });
        // With a callback:
        fse.outputFile("./coverage/index.html", output);
    }
);
