.. _susyweb-core:

.. include:: include_announcement.rst

===========
Core Module
===========

The ``Core Module`` does provide the ``AbstractSusyWebModule`` to implement SusyWeb compatible modules.

.. _susyweb-module-abstract-module:

AbstractSusyWebModule
==================

Source: `AbstractSusyWebModule <https://octonion.institute/susy-js/susyweb.js/tree/1.0/packages/susyweb-core/src/AbstractSusyWebModule.js>`_

The ``AbstractSusyWebModule`` does have the following constructor parameters:

- ``provider`` - ``AbstractSocketProvider | HttpProvider | CustomProvider | String`` The provider class or string.
- ``options`` - ``SusyWebModuleOptions`` These are the default ``options`` of a SusyWeb module. (optional)
- ``methodFactory`` - ``AbstractMethodFactory`` The :ref:`AbstractMethodFactory <susyweb-abstract-method-factory>` will be used in the module proxy for the JSON-RPC method calls. (optional)
- ``net`` - ``net.Socket`` The ``net.Socket`` object of the NodeJS net module. (optional)

-------
Example
-------

.. code-block:: javascript

    import {AbstractSusyWebModule} from 'susyweb-core';

    class Example extends AbstractSusyWebModule {
        /**
         * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} provider
         * @param {AbstractMethodFactory} methodFactory
         * @param {SusyWebModuleOptions} options
         * @param {Net.Socket} nodeNet
         *
         * @constructor
         */
        constructor(provider, net, methodFactory, options) {
            super(provider, net, methodFactory, options;
        }
    }


Interface of the ``AbstractSusyWebModule`` class:

.. include:: include_package-core.rst

------------------------------------------------------------------------------------------------------------------------

