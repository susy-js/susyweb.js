.. include:: include_announcement.rst

===============
Getting Started
===============

The susyweb.js library is a collection of modules which contain specific functionality for the Sophon ecosystem.

- The ``susyweb-sof`` is for the Sophon blockchain and smart contracts
- The ``susyweb-shh`` is for the whisper protocol to communicate p2p and broadcast
- The ``susyweb-utils`` contains useful helper functions for DApp developers.


.. _adding-susyweb:

Adding susyweb.js
==============

.. index:: npm

First you need to get susyweb.js into your project. This can be done using the following methods:

- npm: ``npm install susyweb``

After that you need to create a susyweb instance and set a provider.
A Sophon compatible browser will have a ``window.sophon`` or ``susyweb.currentProvider`` available.
For  susyweb.js, check ``SusyWeb.givenProvider``. If this property is ``null`` you should connect to your own local or remote node.

.. code-block:: javascript

    // in node.js use: const SusyWeb = require('susyweb');

    // use the given Provider, e.g in the browser with Metamask, or instantiate a new websocket provider
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://localhost:8546', null, {});

    // or
    const susyweb = new SusyWeb(SusyWeb.givenProvider || new SusyWeb.providers.WebsocketProvider('ws://localhost:8546'), null, {});

    // Using the IPC provider in node.js
    const net = require('net');

    const susyweb = new SusyWeb('/Users/myuser/Library/Sophon/graviton.ipc', net, {}); // mac os path
    // or
    const susyweb = new SusyWeb(new SusyWeb.providers.IpcProvider('/Users/myuser/Library/Sophon/graviton.ipc', net, {})); // mac os path
    // on windows the path is: '\\\\.\\pipe\\graviton.ipc'
    // on linux the path is: '/users/myuser/.sophon/graviton.ipc'


That's it! now you can use the ``susyweb`` object.
