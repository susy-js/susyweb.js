import pkg from './package.json';
import rollupConfig from '../../rollup.config';

export default rollupConfig('SusyWebSofEns', pkg.name, {
    'susyweb-sof-contract': 'susyweb-sof-contract',
    'susyweb-core-promievent': 'susyweb-core-promievent',
    'sof-ens-namehash': 'sof-ens-namehash'
});
