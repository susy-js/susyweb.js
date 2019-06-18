/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    SusyWeb = (typeof window.SusyWeb !== 'undefined') ? window.SusyWeb : require('susyweb');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    SusyWeb = (typeof global.SusyWeb !== 'undefined') ? global.SusyWeb : require('susyweb');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */