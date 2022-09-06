#!/bin/bash

for f in ./src/**/*.svg; do
    out="${f//src/public}"
    echo "Optimizing $f file to $out";
    svgo $f -o $out
done
