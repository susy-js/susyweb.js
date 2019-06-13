
.. include:: include_announcement.rst

====
SusyWeb
====

    The SusyWeb class is a wrapper to house all Sophon related modules.


Initiating of SusyWeb
=====================

----------
Parameters
----------

1. ``provider`` - ``string|object``: A URL or one of the SusyWeb provider classes.
2. ``net`` - ``net.Socket`` (optional): The net NodeJS package.
3. ``options`` - ``object`` (optional) The SusyWeb :ref:`options <susyweb-module-options>`


-------
Example
-------

.. code-block:: javascript

    import SusyWeb from 'susyweb';

    // "SusyWeb.givenProvider" will be set in a Sophon supported browser.
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', net, options);

    > susyweb.sof
    > susyweb.shh
    > susyweb.utils
    > susyweb.version


------------------------------------------------------------------------------


SusyWeb.modules
=====================

    This Static property will return an object with the classes of all major sub modules, to be able to instantiate them manually.

-------
Returns
-------

``Object``: A list of modules:
    - ``Sof`` - ``Function``: the Sof module for interacting with the Sophon network see :ref:`susyweb.sof <sof>` for more.
    - ``Net`` - ``Function``: the Net module for interacting with network properties see :ref:`susyweb.sof.net <sof-net>` for more.
    - ``Personal`` - ``Function``: the Personal module for interacting with the Sophon accounts see :ref:`susyweb.sof.personal <sof-personal>` for more.
    - ``Shh`` - ``Function``: the Shh module for interacting with the whisper protocol see :ref:`susyweb.shh <shh>` for more.

-------
Example
-------

.. code-block:: javascript

    SusyWeb.modules
    > {
        Sof(provider, net?, options?),
        Net(provider, net?, options?),
        Personal(provider, net?, options?),
        Shh(provider, net?, options?),
    }


.. include:: include_package-core.rst

------------------------------------------------------------------------------

version
=====================

    Property of the SusyWeb class.

.. code-block:: javascript

    susyweb.version

Contains the version of the ``susyweb`` wrapper class.

-------
Returns
-------

``String``: The current version.

-------
Example
-------

.. code-block:: javascript

    susyweb.version;
    > "1.0.0"
