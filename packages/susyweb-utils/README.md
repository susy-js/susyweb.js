# susyweb-utils

This is a sub package of [susyweb.js][repo]

This contains useful utility functions for Dapp developers.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-utils
```

## Usage

Import all of the utils functions

```js
import * as Utils from 'susyweb-utils';

console.log(Utils);
> {
    keccak256: Function,
    soliditySha3: Function,
    isAddress: Function,
    ...
}
```

Import what you need

```js
import { asciiToHex } from 'susyweb-utils';

console.log(asciiToHex('I have 100!'));
> "0x49206861766520313030e282ac"
```

## Types

All the typescript typings are placed in the types folder.

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
