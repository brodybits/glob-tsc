# glob-tsc

The purpose of this command is to add support for file globbing to Typescript compiler `tsc`.

Globs can be provided by:
* Reading `filesGlob` property of tsconfig.json
* Providing it through command line arguments

**All options not supported by this package will be passed to tsc compiler command**

based on: [`tsc-glob`](https://www.npmjs.com/package/tsc-glob) version `1.1.0`

## Installation
Install the package

```bash
npm install --save-dev glob-tsc
```

## Usage

```bash
glob-tsc [options]
```

**Options**

| alias | command                  | description                                          |
| ----- | ------------------------ | ---------------------------------------------------- |
| -h    | --help                   | output usage information                             |
| -V    | --version                | output the version number                            |
| -f    | --tsconfig-file <path>   | tsconfig.json file location. Default ./tsconfig.json |
| -g    | --files-glob <globs>     | File globs (ignores filesGlob in tsconfig file)      |

## Examples

Using command globs with `-g` alias (easiest):

```bash
glob-tsc --outDir dist --declaration -g src/**/ts/*.ts
```

for JavaScript type linting (see [JavaScript type linting on Medium](https://medium.com/@trukrs/javascript-type-linting-5903e9e3625f)):

```bash
glob-tsc --allowJs --checkJs --noEmit --resolveJsonModule --target es5 -g bin/**/*.js,lib/**/*.js,test/**/*.js
```

Using alternative tsconfig JSON file:
```bash
glob-tsc --tsconfig-file config/tsconfig.json --outDir dist --declaration
```

Using command globs with `--files-globs`:
```bash
glob-tsc --files-globs src/**/ts/*.ts --outDir dist --declaration
```

## Major TODO items

- package "main" script should export some kind of a library API
- cleaner & clearer log output
- cleaner error reporting in the following cases:
  - no file globs or tsconfig.json file present
  - no valid tsc (TypeScript compiler) is found
