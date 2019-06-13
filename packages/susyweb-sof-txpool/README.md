# susyweb-sof-txpool

This is a sub package of [susyweb.js][repo]

This is the TxPool module. This is an independent module. If you want to use this module, you need to import it in your project.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-txpool
```

## Usage

```js
import {TxPool} from 'susyweb-sof-txpool';

const txPool = new TxPool(
    'http://127.0.0.1:8546',
    null,
    options
);
```

## Types

All the typescript typings are placed in the types folder.

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
