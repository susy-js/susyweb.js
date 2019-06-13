.. _sof-net:

.. include:: include_announcement.rst

============
susyweb.sof.net
============


Functions to receive details about the current connected network.


------------------------------------------------------------------------------


.. include:: include_package-net.rst


------------------------------------------------------------------------------

getNetworkType
=====================

.. code-block:: javascript

    susyweb.sof.net.getNetworkType([callback])

Guesses the chain the node is connected by comparing the genesis hashes.

.. note:: It's recommended to use the :ref:`susyweb.sof.getChainId <sof-chainId>` method to detect the currently connected chain.

-------
Returns
-------

``Promise`` returns ``String``:
    - ``"main"`` for main network
    - ``"morden"`` for the morden test network
    - ``"rinkeby"`` for the rinkeby test network
    - ``"ropsten"`` for the ropsten test network
    - ``"kovan"`` for the kovan test network
    - ``"private"`` for undetectable networks.


-------
Example
-------

.. code-block:: javascript

    susyweb.sof.net.getNetworkType().then(console.log);
    > "main"


