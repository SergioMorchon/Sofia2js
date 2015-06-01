# Sofia2 - ECMAScript

[![npm version](https://badge.fury.io/js/sofia2.svg)](http://badge.fury.io/js/sofia2)
[![Build Status](https://travis-ci.org/SergioMorchon/Sofia2js.svg)](https://travis-ci.org/SergioMorchon/Sofia2js)

** UNDER CONSTRUCTION, COMING SOON... **

The client for [ECMAScript](http://www.ecmascript.org/) (from now simply "ES", the standard specification of the well known *JavaScript* language) is built over ECMAScript 6 draft standards, but using only the subset that is able to be pollyfied with and for ES3.

----------

*Always looking at the future!*

----------

By doing this, Sofia2 ECMAScript version will be able to run **not only in modern browsers but also over legacy ones** like Internet Explorer 8.

## Use it

Because sofia2 follows the [UMD](https://github.com/umdjs/umd), it is able to run over any module system (like [CommonJS Modules](http://wiki.commonjs.org/wiki/Modules) on [node.js](https://nodejs.org/), [RequireJS](http://www.requirejs.org/) on browsers or a simple global variable `var Sofia2`).

### Nodejs && NPM

With npm do:
`npm install sofia2 --save-dev`

### Browsers

Include the `release/sofia2.bundle.js` in your document with a `<script>` tag or with a `require` sentence.

#### Polyfills

EcmaScript 5:
- Shim: you can download it from [es5-shim npm package](https://www.npmjs.com/package/es5-shim) **before** ECMAScript 6 pollyfills and sofia2js.

EcmaScript 6:
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): You can download it from [es6-promise npm package](https://www.npmjs.com/package/es6-promise) **before** sofia2js.

## Build it

In order to build the ECMAScript client of Sofia2, you will need to following the next steps:

1. Install [node.js](https://nodejs.org/), with [npm](https://www.npmjs.com/) included in the setup process.
2. Open a command prompt over the `ecmascript` folder.
3. Run `npm install`.

A new folder `release` will appear, containing ol the generated files...

*Thats all!*

## Examples

- [Browser](doc/examples/insert.md)