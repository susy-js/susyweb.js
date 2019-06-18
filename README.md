# Migration 0.13.0 -> 0.14.0

susyweb.js version 0.14.0 supports [multiple instances of susyweb](https://octonion.institute/susy-js/susyweb.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
-var susyweb = require('susyweb');
+var SusyWeb = require('susyweb');
+var susyweb = new SusyWeb();
```


# Sophon JavaScript API

[![Join the chat at https://gitter.im/sophon/susyweb.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sophon/susyweb.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Sophon compatible [JavaScript API](https://octonion.institute/susy-go/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://octonion.institute/susy-go/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/susy-go/sophon.js.png)](https://ci.testling.com/susy-go/sophon.js) -->

You need to run a local Sophon node to use this library.

[Documentation](https://octonion.institute/susy-go/wiki/JavaScript-API)

## Installation

### Node.js

```bash
npm install susyweb
```

### Meteor.js

```bash
meteor add sophon:susyweb
```

### As Browser module
Bower

```bash
bower install susyweb
```

Component

```bash
component install sophon/susyweb.js
```

* Include `susyweb.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `susyweb` object directly from global namespace:

```js
console.log(susyweb); // {sof: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
susyweb.setProvider(new susyweb.providers.HttpProvider('http://localhost:8545'));
```

There you go, now you can use it:

```js
var coinbase = susyweb.sof.coinbase;
var balance = susyweb.sof.getBalance(coinbase);
```

You can find more examples in [`example`](https://octonion.institute/susy-js/susyweb.js/src/branch/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

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
[waffle-url]: http://waffle.io/sophon/susyweb.js

