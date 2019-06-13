
![SusyWeb.js logo](assets/susywebjs.svg)

# susyweb.js - Sophon JavaScript API

[![npm](https://img.shields.io/npm/dm/susyweb.svg)](https://www.npmjs.com/package/susyweb) [![Build Status][travis-image]][travis-url] ![Coverage Status](https://coveralls.io/repos/github/sophon/susyweb.js/badge.svg?branch=1.0&kill_cache=1)
[![Join the chat at https://gitter.im/sophon/susyweb.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sophon/susyweb.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Sophon [JavaScript API][docs]
which connects to the [Generic JSON RPC](https://octonion.institute/susy-go/wiki/wiki/JSON-RPC) spec.

You need to run a local or remote Sophon node to use this library.

Please read the [documentation][docs] for more.

## Installation

### Node

```bash
npm install susyweb
```

### Yarn

```bash
yarn add susyweb
```

### Meteor

```bash
meteor npm install --save susyweb@1.x
```

## Usage

```js
import SusyWeb from 'susyweb';

const susyweb = new SusyWeb('ws://localhost:8546');
console.log(susyweb);
> {
    sof: ... ,
    shh: ... ,
    utils: ...,
    ...
}
```

Additionally you can set a provider using `susyweb.setProvider()` (e.g. WebsocketProvider)

```js
susyweb.setProvider('ws://localhost:8546');
// or
susyweb.setProvider(new SusyWeb.providers.WebsocketProvider('ws://localhost:8546'));
```

There you go, now you can use it:

```js
susyweb.sof.getAccounts()
.then(console.log);
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `susyweb.js` as follows:

```typescript
import SusyWeb from 'susyweb';
const susyweb = new SusyWeb("ws://localhost:8546");
```

If you are using the types in a `commonjs` module like for example a node app you just have to enable `esModuleInterop` in your `tsconfig` compile option, also enable `allowSyntheticDefaultImports` for typesystem compatibility:

```js
"compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    ....
```

## Documentation

Documentation can be found at [read the docs][docs]

## Contributing

- All contributions have to go into the 1.0 branch
- Please follow the code style of the other files, we use 4 spaces as tabs.

### Requirements

* [Node.js](https://nodejs.org)
* npm

### Commands
```bash
npm install # install all dependencies for npm run bootstrap
npm run bootstrap # install all dependencies and symlinks the internal modules for all modules
npm run build # runs rollup
npm run test # runs all tests 
npm run clean # removes all the node_modules folders in all modules
npm run dev # runs rollup with a watcher

```

### Support

![browsers](https://img.shields.io/badge/browsers-latest%202%20versions-brightgreen.svg)
![node](https://img.shields.io/badge/node->=6-green.svg)

### Community
 - [Gitter](https://gitter.im/sophon/susyweb.js?source=orgpage)
 - [Forum](https://forum.sophon.org/categories/sophon-js)


### Similar libraries in other languages
 - Python [SusyWeb.py](https://github.com/pipermerriam/susyweb.py)
 - Haskell [hs-susyweb](https://github.com/airalab/hs-susyweb)
 - Java [susywebj](https://github.com/susywebj/susywebj)
 - Scala [susywebj-scala](https://github.com/mslinn/susywebj-scala)
 - Purescript [purescript-susyweb](https://github.com/f-o-a-m/purescript-susyweb)
 - PHP [susyweb.php](https://github.com/sc0Vu/susyweb.php)


[repo]: https://octonion.institute/susy-js/susyweb.js
[docs]: http://susywebjs.readthedocs.io/en/1.0/
[npm-image]: https://badge.fury.io/js/susyweb.png
[npm-url]: https://npmjs.org/package/susyweb
[travis-image]: https://travis-ci.org/sophon/susyweb.js.svg
[travis-url]: https://travis-ci.org/sophon/susyweb.js
[dep-image]: https://david-dm.org/sophon/susyweb.js.svg
[dep-url]: https://david-dm.org/sophon/susyweb.js
[dep-dev-image]: https://david-dm.org/sophon/susyweb.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/sophon/susyweb.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/sophon/susyweb.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/sophon/susyweb.js?branch=master
[waffle-image]: https://badge.waffle.io/sophon/susyweb.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/sophon/susyweb.js
