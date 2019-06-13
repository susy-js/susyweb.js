# susyweb-sof-debug

This is a sub module of [susyweb.js][repo]

This is the debug module and can be used as a standalone module.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-debug
```

## Usage

```js
import {Debug} from 'susyweb-sof-debug';

const debug = new Debug(
    'http://127.0.0.1:8546',
    null,
    options
);
```

## Types

All the typescript typings are placed in the types folder.

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
