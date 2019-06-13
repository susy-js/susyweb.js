.. _sof-personal:

.. include:: include_announcement.rst

=================
susyweb.sof.personal
=================


The ``susyweb-sof-personal`` package allows you to interact with the Sophon node's accounts.

.. note:: Many of these functions send sensitive information, like password. Never call these functions over a unsecured Websocket or HTTP provider, as your password will be sent in plain text!


.. code-block:: javascript

    import SusyWeb from 'susyweb';
    import {Personal} from 'susyweb-sof-personal';

    // "SusyWeb.givenProvider" will be set if in an Sophon supported browser.
    const personal = new Personal(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);


    // or using the susyweb umbrella package
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);

    // -> susyweb.sof.personal


------------------------------------------------------------------------------


.. include:: include_package-core.rst



------------------------------------------------------------------------------

.. _personal-newaccount:

newAccount
=========

.. code-block:: javascript

    susyweb.sof.personal.newAccount(password, [callback])

Create a new account on the node that SusyWeb is connected to with its provider.
The RPC method used is ``personal_newAccount``. It differs from
:ref:`susyweb.sof.accounts.create() <accounts-create>` where the key pair is
created only on client and it's up to the developer to manage it.

.. note:: Never call this function over a unsecured Websocket or HTTP provider, as your password will be send in plain text!

----------
Parameters
----------

1. ``password`` - ``String``: The password to encrypt this account with.

-------
Returns
-------

``Promise<string>`` - The address of the newly created account.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.personal.newAccount('!@superpassword')
    .then(console.log);
    > '0x1234567891011121314151617181920212223456'

------------------------------------------------------------------------------


sign
=====================

.. code-block:: javascript

    susyweb.sof.personal.sign(dataToSign, address, password [, callback])

Signs data using a specific account. This data is before UTF-8 HEX decoded and enveloped as follows: ``"\x19Sophon Signed Message:\n" + message.length + message``.



.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------


1. ``String`` - Data to sign. If String it will be converted using :ref:`susyweb.utils.utf8ToHex <utils-utf8tohex>`.
2. ``String`` - Address to sign data with.
3. ``String`` - The password of the account to sign data with.
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<string>`` - The signature.


-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

    // the below is the same
    susyweb.sof.personal.sign(susyweb.utils.utf8ToHex("Hello world"), "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
    .then(console.log);
    > "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"


------------------------------------------------------------------------------


ecRecover
=====================

.. code-block:: javascript

    susyweb.sof.personal.ecRecover(dataThatWasSigned, signature [, callback])

Recovers the account that signed the data.

----------
Parameters
----------


1. ``String`` - Data that was signed. If String it will be converted using :ref:`susyweb.utils.utf8ToHex <utils-utf8tohex>`.
2. ``String`` - The signature.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<string>`` - The account.


-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.ecRecover("Hello world", "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400").then(console.log);
    > "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"

------------------------------------------------------------------------------


signTransaction
=====================

.. code-block:: javascript

    susyweb.sof.personal.signTransaction(transaction, password [, callback])

Signs a transaction. This account needs to be unlocked.

.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------


1. ``Object`` - The transaction data to sign :ref:`susyweb.sof.sendTransaction() <sof-sendtransaction>` for more.
2. ``String`` - The password of the ``from`` account, to sign the transaction with.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<Object>`` - The SRLP encoded transaction. The ``raw`` property can be used to send the transaction using :ref:`susyweb.sof.sendSignedTransaction <sof-sendsignedtransaction>`.


-------
Example
-------


.. code-block:: javascript

    susyweb.sof.signTransaction({
        from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }, 'MyPassword!').then(console.log);
    > {
        raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        tx: {
            nonce: '0x0',
            gasPrice: '0x4a817c800',
            gas: '0x5208',
            to: '0x3535353535353535353535353535353535353535',
            value: '0xde0b6b3a7640000',
            input: '0x',
            v: '0x25',
            r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
            s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
            hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
        }
    }

------------------------------------------------------------------------------


sendTransaction
=====================

.. code-block:: javascript

    susyweb.sof.personal.sendTransaction(transactionOptions, password [, callback])

This method sends a transaction over the management API.

.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------


1. ``Object`` - The transaction options
2. ``String`` - The passphrase for the current account
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<string>`` - The transaction hash.


-------
Example
-------


.. code-block:: javascript

    susyweb.sof.sendTransaction({
        from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }, 'MyPassword!').then(console.log);
    > '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'

------------------------------------------------------------------------------


unlockAccount
=====================

.. code-block:: javascript

    susyweb.sof.personal.unlockAccount(address, password, unlockDuraction [, callback])

Unlocks the given account.

.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------

1. ``address`` - ``String``: The account address.
2. ``password`` - ``String`` - The password of the account.
3. ``unlockDuration`` - ``Number`` - The duration for the account to remain unlocked.
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<boolean>`` - True if the account got unlocked successful otherwise false.

-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.unlockAccount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!", 600)
    .then(console.log('Account unlocked!'));
    > "Account unlocked!"

------------------------------------------------------------------------------


lockAccount
=====================

.. code-block:: javascript

    susyweb.sof.personal.lockAccount(address [, callback])

Locks the given account.

.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------


1. ``address`` - ``String``: The account address.
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<boolean>``


-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.lockAccount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
    .then(console.log('Account locked!'));
    > "Account locked!"

------------------------------------------------------------------------------

.. _personal-getaccounts:

getAccounts
=====================

.. code-block:: javascript

    susyweb.sof.personal.getAccounts([callback])

Returns a list of accounts the node controls by using the provider and calling
the RPC method ``personal_listAccounts``. Using :ref:`susyweb.sof.accounts.create() <accounts-create>`
will not add accounts into this list. For that use
:ref:`susyweb.sof.personal.newAccount() <personal-newaccount>`.

The results are the same as :ref:`susyweb.sof.getAccounts() <sof-getaccounts>` except that calls
the RPC method ``sof_accounts``.

-------
Returns
-------


``Promise<Array>`` - An array of addresses controlled by node.

-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.getAccounts()
    .then(console.log);
    > ["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]


------------------------------------------------------------------------------


importRawKey
=====================

.. code-block:: javascript

    susyweb.sof.personal.importRawKey(privateKey, password)

Imports the given private key into the key store, encrypting it with the passphrase.

Returns the address of the new account.

.. note:: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

----------
Parameters
----------


1. ``privateKey`` - ``String`` - An unencrypted private key (hex string).
2. ``password`` - ``String`` - The password of the account.


-------
Returns
-------


``Promise<string>`` - The address of the account.

-------
Example
-------


.. code-block:: javascript

    susyweb.sof.personal.importRawKey("cd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e", "password1234")
    .then(console.log);
    > "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"

------------------------------------------------------------------------------
