
.. _net-getid:

getId
=====================

.. code-block:: javascript

    susyweb.sof.net.getId([callback])
    susyweb.shh.net.getId([callback])

Gets the current network ID.

----------
Parameters
----------

none

-------
Returns
-------

``Promise`` returns ``Number``: The network ID.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.net.getId().then(console.log);
    > 1

------------------------------------------------------------------------------

isListening
=====================

.. code-block:: javascript

    susyweb.sof.net.isListening([callback])
    susyweb.shh.net.isListening([callback])

Checks if the node is listening for peers.

----------
Parameters
----------

none

-------
Returns
-------

``Promise`` returns ``Boolean``

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.isListening().then(console.log);
    > true

------------------------------------------------------------------------------

getPeerCount
=====================

.. code-block:: javascript

    susyweb.sof.net.getPeerCount([callback])
    susyweb.shh.net.getPeerCount([callback])

Get the number of peers connected to.

----------
Parameters
----------

none

-------
Returns
-------

``Promise`` returns ``Number``

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.getPeerCount().then(console.log);
    > 25
