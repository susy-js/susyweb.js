# susyweb-providers

This is a sub module of [susyweb.js][repo]

## Installation

```bash
npm install susyweb-providers
```

## Usage Examples

#### HttpProvider
You can pass with the options object the timeout and all known HTTP headers. 

```js 
import {HttpProvider} from 'susyweb-providers';

const options = {
    timeout: 20000,
    headers: [
        {
            name: 'Access-Control-Allow-Origin', value: '*'
        },
        ...
    ]
};

const httpProvider = new HttpProvider('http://localhost:8545', options); 
```

#### WebsocketProvider

Instead of setting a authorization header you could also define the credentials over the URL with:
```ws://username:password@localhost:8546```

```js 
import {WebsocketProvider} from 'susyweb-providers';
const options = { 
    timeout: 30000, 
    headers: {
        authorization: 'Basic username:password'
    }
};
 
const websocketProvider = new WebsocketProvider('ws://localhost:8546', options);
```

#### IpcProvider
```js 
import {IpcProvider} from 'susyweb-providers';
import net from 'net';

const ipcProvider = new IpcProvider('/Users/me/Library/Sophon/graviton.ipc', net);
```

#### BatchRequest
The BatchRequest provides the possibility to send JSON-RPC requests as batch.
Please read the [documentation][docs] for more.

```js 
import {ProviderResolver, BatchRequest} 'susyweb-providers';

const provider = new ProviderResolver().resolve('ws://localhost:8546');
const batchRequest = new BatchRequest(provider);

batchRequest.add(susyweb.sof.getBalance.request(
    '0x0000000000000000000000000000000000000000',
    'latest',
    callback
));

await batchRequest.execute();
```

#### ProviderDetector
Checks if an provider is given from the environment (Mist, MetaMask) and returns the provider.

```js
import {ProviderDetector} from 'susyweb-providers';

const givenProvider = ProviderDetector.detect();
```

#### ProviderResolver
The ProviderResolver resolves an url or an given provider object to the correct provider class. 
Because of the resolves does susyweb has internally just one provider interface and we have no direct dependency to third party providers.

```js 
import {ProviderResolver} 'susyweb-providers';

const socketProviderAdapter = new ProviderResolver().resolve('ws://localhost:8546');
```

## Types 

All the typescript typings are placed in the types folder. 

[docs]: http://susywebjs.readthedocs.io/en/1.0/
[repo]: https://octonion.institute/susy-js/susyweb.js
