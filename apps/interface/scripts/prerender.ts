// import chokidar from "chokidar";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import glob from "glob";

glob("./templates/**/*.tsx", (files) => {
    console.log(files);
});
