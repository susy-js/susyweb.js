# susyweb-net

This is a sub module of [susyweb.js][repo]

This is the net module to be used in other susyweb.js modules.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-net
```

## Usage

```js
import {Network} from 'susyweb-net';

const net = new Network(
    'http://127.0.0.1:4546',
    null,
    options
);
```

## Types 

All the typescript typings are placed in the types folder. 

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
