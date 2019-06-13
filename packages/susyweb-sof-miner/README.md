# susyweb-sof-miner

This is a sub module of [susyweb.js][repo]

This is the miner module. This is an independent module. If you want to use this module, you need to import this in your project.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-miner
```

## Usage

```js
import {Miner} from 'susyweb-sof-miner';

const miner = new Miner(
    'http://127.0.0.1:8546',
    null,
    options
);
```

## Types

All the typescript typings are placed in the types folder.

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
