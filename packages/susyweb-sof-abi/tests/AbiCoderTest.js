import * as Utils from 'susyweb-utils';
import {AbiCoder as SophysAbiCoder} from 'sophys/utils/abi-coder';
import AbiCoder from '../src/AbiCoder';

// Mocks
jest.mock('susyweb-utils');
jest.mock('sophys/utils/abi-coder');

/**
 * AbiCoder test
 */
describe('AbiCoderTest', () => {
    let abiCoder, sophysAbiCoderMock;

    beforeEach(() => {
        new SophysAbiCoder();
        sophysAbiCoderMock = SophysAbiCoder.mock.instances[0];

        abiCoder = new AbiCoder(Utils, sophysAbiCoderMock);
    });

    it('constructor check', () => {
        expect(abiCoder.utils).toEqual(Utils);

        expect(abiCoder.sophysAbiCoder).toEqual(sophysAbiCoderMock);
    });

    it('calls encodeFunctionSignature with a string as parameter', () => {
        Utils.keccak256 = jest.fn(() => {
            return '0x000000000';
        });

        expect(abiCoder.encodeFunctionSignature('functionName')).toEqual('0x00000000');

        expect(Utils.keccak256).toHaveBeenCalledWith('functionName');
    });

    it('calls encodeFunctionSignature with a object as parameter', () => {
        Utils.jsonInterfaceMethodToString.mockReturnValueOnce('0x000000000');

        Utils.keccak256 = jest.fn(() => {
            return '0x000000000';
        });

        expect(abiCoder.encodeFunctionSignature({})).toEqual('0x00000000');

        expect(Utils.jsonInterfaceMethodToString).toHaveBeenCalledWith({});

        expect(Utils.keccak256).toHaveBeenCalledWith('0x000000000');
    });

    it('calls encodeEventSignature with a object as parameter', () => {
        Utils.jsonInterfaceMethodToString.mockReturnValueOnce('0x000000000');

        Utils.keccak256 = jest.fn(() => {
            return '0x000000000';
        });

        expect(abiCoder.encodeEventSignature({})).toEqual('0x000000000');

        expect(Utils.jsonInterfaceMethodToString).toHaveBeenCalledWith({});

        expect(Utils.keccak256).toHaveBeenCalledWith('0x000000000');
    });

    it('calls encodeEventSignature with a string as parameter', () => {
        Utils.keccak256 = jest.fn(() => {
            return '0x000000000';
        });

        expect(abiCoder.encodeEventSignature('functionName')).toEqual('0x000000000');

        expect(Utils.keccak256).toHaveBeenCalledWith('functionName');
    });

    it('calls encodeParameters', () => {
        sophysAbiCoderMock.encode.mockReturnValueOnce(true);

        expect(abiCoder.encodeParameters([{components: true}], [])).toEqual(true);

        expect(sophysAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], []);
    });

    it('calls encodeParameter', () => {
        sophysAbiCoderMock.encode.mockReturnValueOnce(true);

        expect(abiCoder.encodeParameter({components: true}, '')).toEqual(true);

        expect(sophysAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], ['']);
    });

    it('calls encodeFunctionCall and returns the expected string', () => {
        Utils.keccak256 = jest.fn(() => {
            return '0x000000000';
        });

        sophysAbiCoderMock.encode.mockReturnValueOnce('0x0');

        expect(abiCoder.encodeFunctionCall({inputs: [{components: true}]}, [])).toEqual('0x000000000');

        expect(sophysAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], []);
    });

    it('calls decodeParameters and returns the expected object', () => {
        sophysAbiCoderMock.decode.mockReturnValueOnce('0');

        expect(abiCoder.decodeParameters([{name: 'output'}], '0x0')).toEqual({output: '0', 0: '0'});

        expect(sophysAbiCoderMock.decode).toHaveBeenCalledWith([{name: 'output'}], '0x0');
    });

    it('calls decodeParameters and throws an error', () => {
        expect(() => {
            abiCoder.decodeParameters(['0'], '0x');
        }).toThrow('Invalid bytes string given: 0x');

        expect(() => {
            abiCoder.decodeParameters(['0']);
        }).toThrow('Invalid bytes string given: undefined');

        expect(() => {
            abiCoder.decodeParameters(['0'], '0X');
        }).toThrow('Invalid bytes string given: 0X');

        expect(() => {
            abiCoder.decodeParameters([], '0X');
        }).toThrow('Empty outputs array given!');
    });

    it('calls decodeParameter and returns the expected object', () => {
        sophysAbiCoderMock.decode.mockReturnValueOnce('0');

        expect(abiCoder.decodeParameter({name: 'output'}, '0x0')).toEqual('0');

        expect(sophysAbiCoderMock.decode).toHaveBeenCalledWith([{name: 'output'}], '0x0');
    });

    it('calls decodeLog and returns the expected object', () => {
        sophysAbiCoderMock.decode
            .mockReturnValueOnce('0')
            .mockReturnValueOnce([['', '', '0']])
            .mockReturnValueOnce(['0', '0']);

        const inputs = [
            {
                indexed: true,
                type: 'bool',
                name: 'first'
            },
            {
                indexed: true,
                type: 'bool',
                name: 'second'
            },
            {
                indexed: false,
                type: '',
                name: 'third'
            },
            {
                indexed: false,
                type: 'string',
                name: 'fourth'
            },
            {
                indexed: true,
                type: 'string',
                name: 'fifth'
            }
        ];

        expect(abiCoder.decodeLog(inputs, '0x0', ['0x0', '0x0'])).toEqual({
            '0': '0',
            first: '0',
            '1': ['', '', '0'],
            second: ['', '', '0'],
            '2': '0',
            third: '0',
            '3': '0',
            fourth: '0'
        });

        expect(sophysAbiCoderMock.decode).toHaveBeenNthCalledWith(1, [inputs[0].type], '0x0');

        expect(sophysAbiCoderMock.decode).toHaveBeenNthCalledWith(2, [inputs[1].type], '0x0');

        expect(sophysAbiCoderMock.decode).toHaveBeenNthCalledWith(3, [inputs[2], inputs[3]], '0x0');
    });
});
