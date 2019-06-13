import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {
    SetSophyBaseMethod,
    SetExtraMethod,
    SetGasPriceMethod,
    StartMiningMethod,
    StopMiningMethod
} from 'susyweb-core-method';

import MethodFactory from '../../../src/factories/MethodFactory';

// Mocks
jest.mock('susyweb-utils');
jest.mock('susyweb-core-helpers');

/**
 * MethodFactory test
 */
describe('MethodFactoryTest', () => {
    let methodFactory;

    beforeEach(() => {
        methodFactory = new MethodFactory(Utils, formatters);
    });

    it('constructor check', () => {
        expect(methodFactory.utils).toEqual(Utils);

        expect(methodFactory.formatters).toEqual(formatters);
    });

    it('JSON-RPC methods check', () => {
        expect(methodFactory.methods).toEqual({
            setSophybase: SetSophyBaseMethod,
            setExtra: SetExtraMethod,
            setGasPrice: SetGasPriceMethod,
            startMining: StartMiningMethod,
            stopMining: StopMiningMethod
        });
    });
});
