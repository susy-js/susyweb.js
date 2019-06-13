# susyweb-sof-accounts

This is a sub module of [susyweb.js][repo]

This is the accounts module to be used in the `susyweb-sof` module.
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install susyweb-sof-accounts
```

## Usage

```js
import {Accounts} from 'susyweb-sof-accounts';

const accounts = new Accounts(
    'http://127.0.0.1:4546',
    null,
    options
);
```

## Types 

All the typescript typings are placed in the types folder. 

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
