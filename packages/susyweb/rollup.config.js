import pkg from './package.json';
import rollupConfig from '../../rollup.config';

export default rollupConfig('SusyWeb', pkg.name, {
    'susyweb-core': 'susyweb-core',
    'susyweb-providers': 'susyweb-providers',
    'susyweb-utils': 'susyweb-utils',
    'susyweb-sof': 'susyweb-sof',
    'susyweb-sof-personal': 'susyweb-sof-personal',
    'susyweb-shh': 'susyweb-shh',
    'susyweb-net': 'susyweb-net'
});
