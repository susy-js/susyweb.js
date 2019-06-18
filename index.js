var SusyWeb = require('./lib/susyweb');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.SusyWeb === 'undefined') {
    window.SusyWeb = SusyWeb;
}

module.exports = SusyWeb;
