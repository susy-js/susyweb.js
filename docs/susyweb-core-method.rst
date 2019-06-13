.. _susyweb-core-method:

.. include:: include_announcement.rst

==================
Core Method Module
==================

The ``Core Method Module`` does provide all method classes and the abstract method factory which will be used in the ``AbstractSusyWebModule``.

.. _susyweb-abstract-method-factory:


AbstractMethodFactory
=====================

Source: `AbstractMethodFactory <https://octonion.institute/susy-js/susyweb.js/tree/1.0/packages/susyweb-core-method/lib/factories/AbstractMethodFactory.js>`_

The ``AbstractMethodFactory`` does have the following constructor parameters:

- ``utils`` - ``Utils`` The ``Utils`` object from the ``susyweb-utils`` module.
- ``formatters`` - ``Object`` The formatters object from the ``susyweb-core-helpers`` module.

-------
Example
-------

.. code-block:: javascript

    import {
        AbstractMethodFactory,
        GetBlockByNumberMethod,
        ListeningMethod,
        PeerCountMethod,
        VersionMethod
    } from 'susyweb-core-method';

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
                getId: VersionMethod,
                getBlockByNumber: GetBlockByNumberMethod,
                isListening: ListeningMethod,
                getPeerCount: PeerCountMethod
            };
        }
    }


------------------------------------------------------------------------------------------------------------------------

.. _susyweb-module-abstract-method:


AbstractMethod
==============

Source: `AbstractMethod <https://octonion.institute/susy-js/susyweb.js/tree/1.0/packages/susyweb-core-method/lib/methods/AbstractMethod.js>`_

Because we are always adding new JSON-RPC methods do we just link the methods folder as resource.

Source: `Methods <https://octonion.institute/susy-js/susyweb.js/tree/1.0/packages/susyweb-core-method/src/methods/>`_

The provided method classes do have the following interface:

The ``AbstractMethod`` class does have the following constructor parameters:

- ``rpcMethod`` - ``String`` The JSON-RPC method name.
- ``parametersAmount`` - ``Number`` The amount of parameters this JSON-RPC method has.
- ``utils`` - ``Utils``
- ``formatters`` - ``Object`` The formatters object.
- ``moduleInstance`` - ``AbstractSusyWebModule``

The ``AbstractMethod`` class is the base JSON-RPC method class and does provide the basic methods and properties for creating a
SusyWeb.js compatible JSON-RPC method.

You're able to overwrite these methods:

- :ref:`execute(): PromiEvent <susyweb-abstract-method-execute>`
- :ref:`afterExecution(response: any): void <susyweb-abstract-method-after-execution>`
- :ref:`beforeExecution(moduleInstance: AbstractSusyWebModule): void <susyweb-abstract-method-before-execution>`
- :ref:`setArguments(arguments: IArguments): void <susyweb-abstract-method-set-arguments>`
- :ref:`getArguments(arguments: IArguments): {parameters: any[], callback: Function} <susyweb-abstract-method-get-arguments>`


This example will show the usage of the ``setArguments(arguments: IArguments)`` method.

It's also possible to set the parameters and callback method directly over the ``parameters`` and ``callback`` property
of the method class.

-------
Example
-------

.. code-block:: javascript

    class Example extends AbstractSusyWebModule {
        constructor(...) {
            // ...
        }

        sign() {
            const method = new AbstractMethod('sof_sign', 2, utils, formatters, this);
            method.setArguments(arguments)

            return method.execute();
        }
    }

    const example = new Example(...);

    const response = await example.sign('0x0', 'message').
    // > "response"


    example.sign('0x0', 'message', (error, response) => {
        console.log(response);
    };
    // > "response"


------------------------------------------------------------------------------------------------------------------------


The ``AbstractMethod`` class interface:


------------------------------------------------------------------------------------------------------------------------


.. include:: include_susyweb-module-abstract-method-class-reference.rst


------------------------------------------------------------------------------------------------------------------------


.. _susyweb-module-abstract-send-method:


AbstractObservedTransactionMethod
=================================

Source: `AbstractObservedTransactionMethod <https://octonion.institute/susy-js/susyweb.js/tree/1.0/packages/susyweb-core-method/lib/methods/transaction/AbstractObservedTransactionMethod.js>`_

The ``AbstractObservedTransactionMethod`` extends from the :ref:`AbstractMethod <susyweb-module-abstract-method` and
does have the following constructor parameters:

- ``rpcMethod`` - ``String`` The JSON-RPC method name.
- ``parametersAmount`` - ``Number`` The amount of parameters this JSON-RPC method has.
- ``utils`` - ``Object`` The Utils object.
- ``formatters`` - ``Object`` The formatters object.
- ``transactionObserver`` - ``TransactionObserver`` The ``TransactionObserver`` class which defines the confirmation process of the transaction.

The ``AbstractObservedTransactionMethod`` is the base method class for all "send transaction" methods.

Abstract methods:

- :ref:`afterExecution <susyweb-abstract-method-after-execution>`
- :ref:`beforeExecution <susyweb-abstract-method-before-execution>`

.. include:: include_susyweb-module-abstract-method-class-reference.rst

------------------------------------------------------------------------------------------------------------------------
