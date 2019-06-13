.. _sof-iban:

.. include:: include_announcement.rst

=============
susyweb.sof.Iban
=============

The ``susyweb.sof.Iban`` function lets convert Sophon addresses from and to IBAN and BBAN.

.. code-block:: javascript

    import {Iban} from 'susyweb-sof-iban';

    const iban = new Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');

    // or using the susyweb umbrella package

    import SusyWeb from 'susyweb';
    const susyweb = new SusyWeb(SusyWeb.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);

    // -> new susyweb.sof.Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')



------------------------------------------------------------------------------

Iban instance
=====================

This's instance of Iban

.. code-block:: javascript

    > Iban { _iban: 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS' }

------------------------------------------------------------------------------

.. _sof-iban-toaddress:

toAddress
=====================

    static function

.. code-block:: javascript

    susyweb.sof.Iban.toAddress(ibanAddress)

Singleton: Converts a direct IBAN address into an Sophon address.

.. note:: This method also exists on the IBAN instance.

----------
Parameters
----------

1. ``String``: the IBAN address to convert.

-------
Returns
-------

``String`` - The Sophon address.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.toAddress("XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS");
    > "0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8"


------------------------------------------------------------------------------

.. _sof-iban-toiban:

toIban
=====================

    static function

.. code-block:: javascript

    susyweb.sof.Iban.toIban(address)

Singleton: Converts an Sophon address to a direct IBAN address.

----------
Parameters
----------

1. ``String``: the Sophon address to convert.

-------
Returns
-------

``String`` - The IBAN address.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.toIban("0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8");
    > "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"


------------------------------------------------------------------------------

.. _sof-iban-fromaddress:

    static function, return IBAN instance

fromAddress
=====================

.. code-block:: javascript

    susyweb.sof.Iban.fromAddress(address)

Singleton: Converts an Sophon address to a direct IBAN instance.

----------
Parameters
----------

1. ``String``: the Sophon address to convert.

-------
Returns
-------

``Object`` - The IBAN instance.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.fromAddress("0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8");
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}


------------------------------------------------------------------------------

.. _sof-iban-frombban:

    static function, return IBAN instance

fromBban
=====================

.. code-block:: javascript

    susyweb.sof.Iban.fromBban(bbanAddress)

Singleton: Converts an BBAN address to a direct IBAN instance.

----------
Parameters
----------

1. ``String``: the BBAN address to convert.

-------
Returns
-------

``Object`` - The IBAN instance.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.fromBban('SOFXREGGAVOFYORK');
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}


------------------------------------------------------------------------------

.. _sof-iban-createindirect:

    static function, return IBAN instance

createIndirect
=====================

.. code-block:: javascript

    susyweb.sof.Iban.createIndirect(options)

Singleton: Creates an indirect IBAN address from a institution and identifier.

----------
Parameters
----------

1. ``Object``: the options object as follows:
    - ``institution`` - ``String``: the institution to be assigned
    - ``identifier`` - ``String``: the identifier to be assigned

-------
Returns
-------

``Object`` - The IBAN instance.

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.createIndirect({
        institution: "XREG",
        identifier: "GAVOFYORK"
    });
    > Iban {_iban: "XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS"}


------------------------------------------------------------------------------

.. _sof-iban-isvalid:

    static function, return boolean

isValid
=====================

.. code-block:: javascript

    susyweb.sof.Iban.isValid(ibanAddress)

Singleton: Checks if an IBAN address is valid.

.. note:: This method also exists on the IBAN instance.

----------
Parameters
----------

1. ``String``: the IBAN address to check.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    susyweb.sof.Iban.isValid("XE81SOFXREGGAVOFYORK");
    > true

    susyweb.sof.Iban.isValid("XE82SOFXREGGAVOFYORK");
    > false // because the checksum is incorrect


------------------------------------------------------------------------------

prototype.isValid
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.isValid()

Singleton: Checks if an IBAN address is valid.

.. note:: This method also exists on the IBAN instance.

----------
Parameters
----------

1. ``String``: the IBAN address to check.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.isValid();
    > true


------------------------------------------------------------------------------

prototype.isDirect
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.isDirect()

Checks if the IBAN instance is direct.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.isDirect();
    > false

------------------------------------------------------------------------------

prototype.isIndirect
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.isIndirect()

Checks if the IBAN instance is indirect.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.isIndirect();
    > true

------------------------------------------------------------------------------

prototype.checksum
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.checksum()

Returns the checksum of the IBAN instance.

-------
Returns
-------

``String``: The checksum of the IBAN

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.checksum();
    > "81"


------------------------------------------------------------------------------

prototype.institution
=====================

    method of Iban instance


.. code-block:: javascript

    susyweb.sof.Iban.prototype.institution()

Returns the institution of the IBAN instance.

-------
Returns
-------

``String``: The institution of the IBAN

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.institution();
    > 'XREG'


------------------------------------------------------------------------------

prototype.client
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.client()

Returns the client of the IBAN instance.

-------
Returns
-------

``String``: The client of the IBAN

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban("XE81SOFXREGGAVOFYORK");
    iban.client();
    > 'GAVOFYORK'

------------------------------------------------------------------------------

prototype.toAddress
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.toString()

Returns the Sophon address of the IBAN instance.

-------
Returns
-------

``String``: The Sophon address of the IBAN

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
    iban.toAddress();
    > '0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8'


------------------------------------------------------------------------------

prototype.toString
=====================

    method of Iban instance

.. code-block:: javascript

    susyweb.sof.Iban.prototype.toString()

Returns the IBAN address of the IBAN instance.

-------
Returns
-------

``String``: The IBAN address.

-------
Example
-------

.. code-block:: javascript

    const iban = new susyweb.sof.Iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
    iban.toString();
    > 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'

