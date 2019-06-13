# susyweb-sof-contract

This is a sub module of [susyweb.js][repo]

This is the contract module to be used in the `susyweb-sof` module.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-contract
```

## Usage

```js
import {Contract} from 'susyweb-sof-contract';

new Contract(
    'http://127.0.0.1:4546',
    abi,
    address,
    options
);
```

## Types 

All the typescript typings are placed in the types folder. 

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
