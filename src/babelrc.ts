import { type TransformOptions } from "@babel/core";

const REPL_FILENAME = '$bun$repl.ts' as const;

const babelrc: TransformOptions = {
    filename: REPL_FILENAME,
    configFile: false,
    babelrc: false,
    presets: [
        ["@babel/preset-typescript", { onlyRemoveTypeImports: true }]
    ],
    sourceMaps: "inline",
    sourceType: process.argv.includes('--sloppy') ? "script" : "module"
};

export default babelrc;
