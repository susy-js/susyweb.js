.. _susyweb-module-contract:

.. include:: include_announcement.rst

===================
Contract Module API
===================

The ``Contract Module API`` does provide to possibility to create project specific contracts with pre-injecting of the ABI or customizing of the default behaviour of a SusyWeb contract.


Contract
========

The exported class ``Contract`` is here to simply pre-inject a contract ABI.


----------
Parameters
----------

1. ``provider`` - ``AbstractSocketProvider | HttpProvider | CustomProvider | String``: A SusyWeb.js provider.
2. ``abi`` - ``Array``: Contract ABI
3. ``accounts`` - :ref:`Accounts <sof-accounts>`
4. ``options`` - ``SusyWebModuleOptions``


-------
Example
-------

.. code-block:: javascript

    import {MyABI, options} from '../folder/file.js';
    import {Accounts} from 'susyweb-sof-accounts';
    import {Contract} from 'susyweb-sof-contract';

    export class MyContract extends Contract {
        constructor(provider) {
            super(provider, MyAbi, new Accounts(...), '0x0', options);
        }
    }
