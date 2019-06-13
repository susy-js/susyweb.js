.. _net:

.. include:: include_announcement.rst

==========
susyweb.*.net
==========


The ``susyweb-net`` package allows you to interact with the Sophon nodes network properties.


.. code-block:: javascript

    import SusyWeb from 'susyweb';
    import {Net} from 'susyweb-net';

    // "Personal.providers.givenProvider" will be set if in an Sophon supported browser.
    const net = new Net(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);


    // or using the susyweb umbrella package
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);

    // -> susyweb.sof.net
    // -> susyweb.shh.net



------------------------------------------------------------------------------


.. include:: include_package-net.rst


------------------------------------------------------------------------------
