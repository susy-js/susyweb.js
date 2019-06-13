options
=====================

An SusyWeb module does provide several options for configuring the transaction confirmation worklfow or for defining default values.
These are the currently available option properties on a SusyWeb module:

.. _susyweb-module-options:

--------------
Module Options
--------------

:ref:`defaultAccount <susyweb-module-defaultaccount>`

:ref:`defaultBlock <susyweb-module-defaultblock>`

:ref:`defaultGas <susyweb-module-defaultgas>`

:ref:`defaultGasPrice <susyweb-module-defaultaccount>`

:ref:`transactionBlockTimeout <susyweb-module-transactionblocktimeout>`

:ref:`transactionConfirmationBlocks <susyweb-module-transactionconfirmationblocks>`

:ref:`transactionPollingTimeout <susyweb-module-transactionpollingtimeout>`

:ref:`transactionSigner <susyweb-module-transactionSigner>`

-------
Example
-------

.. code-block:: javascript

    import SusyWeb from 'susyweb';

    const options = {
        defaultAccount: '0x0',
        defaultBlock: 'latest',
        defaultGas: 1,
        defaultGasPrice: 0,
        transactionBlockTimeout: 50,
        transactionConfirmationBlocks: 24,
        transactionPollingTimeout: 480,
        transactionSigner: new CustomTransactionSigner()
    }

    const susyweb = new SusyWeb('http://localhost:8545', null, options);

------------------------------------------------------------------------------

.. _susyweb-module-defaultblock:

defaultBlock
=====================

.. code-block:: javascript

    susyweb.defaultBlock
    susyweb.sof.defaultBlock
    susyweb.shh.defaultBlock
    ...

The default block is used for all methods which have a block parameter.
You can override it by passing the block parameter if a block is required.

Example:

- :ref:`susyweb.sof.getBalance() <sof-getbalance>`
- :ref:`susyweb.sof.getCode() <sof-code>`
- :ref:`susyweb.sof.getTransactionCount() <sof-gettransactioncount>`
- :ref:`susyweb.sof.getStorageAt() <sof-getstorageat>`
- :ref:`susyweb.sof.call() <sof-call>`
- :ref:`new susyweb.sof.Contract() -> myContract.methods.myMethod().call() <contract-call>`

-------
Returns
-------

The ``defaultBlock`` property can return the following values:

- ``Number``: A block number
- ``"genesis"`` - ``String``: The genesis block
- ``"latest"`` - ``String``: The latest block (current head of the blockchain)
- ``"pending"`` - ``String``: The currently mined block (including pending transactions)

Default is ``"latest"``

------------------------------------------------------------------------------

.. _susyweb-module-defaultaccount:

defaultAccount
=====================

.. code-block:: javascript

    susyweb.defaultAccount
    susyweb.sof.defaultAccount
    susyweb.shh.defaultAccount
    ...

This default address is used as the default ``"from"`` property, if no ``"from"`` property is specified.

-------
Returns
-------

``String`` - 20 Bytes: Any Sophon address. You need to have the private key for that address in your node or keystore. (Default is ``undefined``)

------------------------------------------------------------------------------

.. _susyweb-module-defaultgasprice:

defaultGasPrice
=====================

.. code-block:: javascript

    susyweb.defaultGasPrice
    susyweb.sof.defaultGasPrice
    susyweb.shh.defaultGasPrice
    ...

The default gas price which will be used for a request.

-------
Returns
-------

``string|number``: The current value of the defaultGasPrice property.


------------------------------------------------------------------------------

.. _susyweb-module-defaultgas:

defaultGas
=====================

.. code-block:: javascript

    susyweb.defaultGas
    susyweb.sof.defaultGas
    susyweb.shh.defaultGas
    ...

The default gas which will be used for a request.

-------
Returns
-------

``string|number``: The current value of the defaultGas property.

------------------------------------------------------------------------------

.. _susyweb-module-transactionblocktimeout:

transactionBlockTimeout
=====================

.. code-block:: javascript

    susyweb.transactionBlockTimeout
    susyweb.sof.transactionBlockTimeout
    susyweb.shh.transactionBlockTimeout
    ...

The ``transactionBlockTimeout`` will be used over a socket based connection. This option does define the amount of new blocks it should wait until the first confirmation happens.
This means the PromiEvent rejects with a timeout error when the timeout got exceeded.


-------
Returns
-------

``number``: The current value of transactionBlockTimeout

------------------------------------------------------------------------------

.. _susyweb-module-transactionconfirmationblocks:

transactionConfirmationBlocks
=====================

.. code-block:: javascript

    susyweb.transactionConfirmationBlocks
    susyweb.sof.transactionConfirmationBlocks
    susyweb.shh.transactionConfirmationBlocks
    ...

This defines the number of blocks it requires until a transaction will be handled as confirmed.


-------
Returns
-------

``number``: The current value of transactionConfirmationBlocks

------------------------------------------------------------------------------


.. _susyweb-module-transactionpollingtimeout:

transactionPollingTimeout
=====================

.. code-block:: javascript

    susyweb.transactionPollingTimeout
    susyweb.sof.transactionPollingTimeout
    susyweb.shh.transactionPollingTimeout
    ...

The ``transactionPollingTimeout``  will be used over a HTTP connection.
This option does define the amount of polls (each second) it should wait until the first confirmation happens.


-------
Returns
-------

``number``: The current value of transactionPollingTimeout

------------------------------------------------------------------------------


.. _susyweb-module-transactionSigner:

transactionSigner
=================

.. code-block:: javascript

    susyweb.sof.transactionSigner
    ...



The ``transactionSigner`` property does provide us the possibility to customize the signing process
of the ``Sof`` module and the related sub-modules.

The interface of a ``TransactionSigner``:

.. code-block:: javascript

    interface TransactionSigner {
        sign(txObject: Transaction): Promise<SignedTransaction>
    }

    interface SignedTransaction {
        messageHash: string,
        v: string,
        r: string,
        s: string,
        rawTransaction: string
    }



-------
Returns
-------

``TransactionSigner``: A JavaScript class of type TransactionSigner.

------------------------------------------------------------------------------

setProvider
=====================

.. code-block:: javascript

    susyweb.setProvider(myProvider)
    susyweb.sof.setProvider(myProvider)
    susyweb.shh.setProvider(myProvider)
    ...

Will change the provider for its module.

.. note:: When called on the umbrella package ``susyweb`` it will also set the provider for all sub modules ``susyweb.sof``, ``susyweb.shh``, etc.

----------
Parameters
----------

1. ``Object|String`` - ``provider``: a valid provider
2. ``Net`` - ``net``: (optional) the node.js Net package. This is only required for the IPC provider.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    import SusyWeb from 'susyweb';

    const susyweb = new SusyWeb('http://localhost:8545');

    // or
    const susyweb = new SusyWeb(new SusyWeb.providers.HttpProvider('http://localhost:8545'));

    // change provider
    susyweb.setProvider('ws://localhost:8546');
    // or
    susyweb.setProvider(new SusyWeb.providers.WebsocketProvider('ws://localhost:8546'));

    // Using the IPC provider in node.js
    const net = require('net');
    const susyweb = new SusyWeb('/Users/myuser/Library/Sophon/graviton.ipc', net); // mac os path

    // or
    const susyweb = new SusyWeb(new SusyWeb.providers.IpcProvider('/Users/myuser/Library/Sophon/graviton.ipc', net)); // mac os path
    // on windows the path is: '\\\\.\\pipe\\graviton.ipc'
    // on linux the path is: '/users/myuser/.sophon/graviton.ipc'

------------------------------------------------------------------------------

providers
=====================

.. code-block:: javascript

    SusyWeb.providers
    Sof.providers
    ...

Contains the current available providers.

----------
Value
----------

``Object`` with the following providers:

    - ``Object`` - ``HttpProvider``: The HTTP provider is **deprecated**, as it won't work for subscriptions.
    - ``Object`` - ``WebsocketProvider``: The Websocket provider is the standard for usage in legacy browsers.
    - ``Object`` - ``IpcProvider``: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.

-------
Example
-------

.. code-block:: javascript

    const SusyWeb = require('susyweb');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://localhost:8546');
    // or
    const susyweb = new SusyWeb(SusyWeb.givenProvider || new SusyWeb.providers.WebsocketProvider('ws://localhost:8546'));

    // Using the IPC provider in node.js
    const net = require('net');

    const susyweb = new SusyWeb('/Users/myuser/Library/Sophon/graviton.ipc', net); // mac os path
    // or
    const susyweb = new SusyWeb(new SusyWeb.providers.IpcProvider('/Users/myuser/Library/Sophon/graviton.ipc', net)); // mac os path
    // on windows the path is: '\\\\.\\pipe\\graviton.ipc'
    // on linux the path is: '/users/myuser/.sophon/graviton.ipc'

------------------------------------------------------------------------------

givenProvider
=====================

.. code-block:: javascript

    SusyWeb.givenProvider
    susyweb.sof.givenProvider
    susyweb.shh.givenProvider
    ...

When using susyweb.js in an Sophon compatible browser, it will set with the current native provider by that browser.
Will return the given provider by the (browser) environment, otherwise ``null``.


-------
Returns
-------

``Object``: The given provider set or ``false``.

-------
Example
-------

.. code-block:: javascript

    susyweb.setProvider(SusyWeb.givenProvider || 'ws://localhost:8546');


------------------------------------------------------------------------------


currentProvider
=====================

.. code-block:: javascript

    susyweb.currentProvider
    susyweb.sof.currentProvider
    susyweb.shh.currentProvider
    ...

Will return the current provider.


-------
Returns
-------

``Object``: The current provider set.

-------
Example
-------

.. code-block:: javascript

    if (!susyweb.currentProvider) {
        susyweb.setProvider('http://localhost:8545');
    }

------------------------------------------------------------------------------

BatchRequest
=====================

.. code-block:: javascript

    new susyweb.BatchRequest()
    new susyweb.sof.BatchRequest()
    new susyweb.shh.BatchRequest()
    ...

Class to create and execute batch requests.

----------
Parameters
----------

none

-------
Returns
-------

``Object``: With the following methods:

    - ``add(request)``: To add a request object to the batch call.
    - ``execute()``: Will execute the batch request.

-------
Example
-------

.. code-block:: javascript

    const contract = new susyweb.sof.Contract(abi, address);

    const batch = new susyweb.BatchRequest();
    batch.add(susyweb.sof.getBalance.request('0x0000000000000000000000000000000000000000', 'latest'));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}));
    batch.execute().then(...);
