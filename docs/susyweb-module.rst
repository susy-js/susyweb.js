.. _susyweb-modules:

.. include:: include_announcement.rst

==========
Module API
==========

The ``Module API`` gives you the possibility to create your **own custom SusyWeb Module** with JSON-RPC methods, subscriptions, or contracts.
The provided modules from the SusyWeb library are also written with the ``Module API`` the core does provide.

The goal of the ``Module API`` is to provide the possibility to extend and customize the JSON-RPC methods, contracts, and subscriptions
to project specific classes with a similar kind of API the DApp developer knows from the SusyWeb.js library.
It's possible with the SusyWeb Module API to create complex contract APIs and tools for the development of a DApp.

These are the core modules which are providing all the classes for the SusyWeb Module API.

- :ref:`susyweb-core <susyweb-core>`
- :ref:`susyweb-core-method <susyweb-core-method>`
- :ref:`susyweb-core-subscriptions <susyweb-core-subscriptions>`
- :ref:`Contract <susyweb-module-contract>`

-------
Example
-------

.. code-block:: javascript

    import * as Utils from 'susyweb-utils';
    import {formatters} from 'susyweb-core-formatters';
    import {AbstractSusyWebModule} from 'susyweb-core';
    import {AbstractMethodFactory, GetBlockByNumberMethod, AbstractMethod} from 'susyweb-core-method';

    class MethodFactory extends AbstractMethodFactory {
        /**
         * @param {Utils} utils
         * @param {Object} formatters
         *
         * @constructor
         */
        constructor(utils, formatters) {
            super(utils, formatters);

            this.methods = {
                getBlockByNumber: GetBlockByNumberMethod
            };
        }
    }

    class Example extends AbstractSusyWebModule {
        /**
         * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} provider
         * @param {SusyWebModuleOptions} options
         * @param {Net.Socket} net
         *
         * @constructor
         */
        constructor(provider, net, options) {
            super(provider, net, new MethodFactory(Utils, formatters), options;
        }

        /**
         * Executes the sof_sign JSON-RPC method
         *
         * @method sign
         *
         * @returns {Promise}
         */
        sign() {
            const method = new AbstractMethod('sof_sign', 2, Utils, formatters, this);
            method.setArguments(arguments)

            return method.execute();
        }

        /**
         * Executes the sof_subscribe JSON-RPC method with the subscription type logs
         *
         * @method logs
         *
         * @returns {LogSubscription}
         */
        logs(options) {
            return new LogSubscription(
              options,
              Utils,
              formatters,
              this,
              new GetPastLogsMethod(Utils, formatters, this)
            );
        }
    }

    const example = new Example(provider, net, options);

    example.sign('0x0', 'message').then(console.log);
    // > "response"

    example.sign('0x0', 'message', (error, response) => {
        console.log(response);
    };
    // > "response"

    const block = example.getBlockByNumber(1).then(console.log);
    // > {}

    example.logs(options).subscribe(console.log);
    > {}

