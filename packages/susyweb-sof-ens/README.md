# susyweb-sof-ens

This is a sub module of [susyweb.js][repo]

This is the Ens module and it will be used in the `susyweb-sof` module.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-ens
```

## Usage

```js
import {Ens} from 'susyweb-sof-ens';

new Ens(
    'ws://localhost:8546',
    null,
    options,
    accountsModule
);
```

## Types 

All the typescript typings are placed in the types folder. 

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
