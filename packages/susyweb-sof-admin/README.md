# susyweb-sof-admin

This is a sub module of [susyweb.js][repo]

This is the admin module. This is an independent module. If you want to use this module, you need to import this in your project.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install susyweb-sof-admin
```

## Usage

```js
import {Admin} from 'susyweb-sof-admin';

const admin = new Admin(
    'http://127.0.0.1:8546',
    null,
    options
);
```

## Types

All the typescript typings are placed in the types folder.

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
