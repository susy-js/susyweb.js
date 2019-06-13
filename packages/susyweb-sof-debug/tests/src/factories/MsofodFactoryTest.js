import * as Utils from 'susyweb-utils';
import {formatters} from 'susyweb-core-helpers';
import {
    BackTraceAtMethod,
    BlockProfileMethod,
    CpuProfileMethod,
    DumpBlockMethod,
    GcStatsMethod,
    GetBlockRlpMethod,
    GoTraceMethod,
    MemStatsMethod,
    SeedHashMethod,
    SetBlockProfileRateMethod,
    SetHeadMethod,
    StacksMethod,
    StartCpuProfileMethod,
    StartGoTraceMethod,
    StopCpuProfileMethod,
    StopGoTraceMethod,
    TraceBlockByHashMethod,
    TraceBlockByNumberMethod,
    TraceBlockFromFileMethod,
    TraceBlockMethod,
    TraceTransactionMethod,
    VerbosityMethod,
    VmoduleMethod,
    WriteBlockProfileMethod,
    WriteMemProfileMethod
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
            setBackTraceAt: BackTraceAtMethod,
            blockProfile: BlockProfileMethod,
            cpuProfile: CpuProfileMethod,
            dumpBlock: DumpBlockMethod,
            getGCStats: GcStatsMethod,
            getBlockRlp: GetBlockRlpMethod,
            goTrace: GoTraceMethod,
            getMemStats: MemStatsMethod,
            getSeedHash: SeedHashMethod,
            setBlockProfileRate: SetBlockProfileRateMethod,
            setHead: SetHeadMethod,
            getStacks: StacksMethod,
            startCPUProfile: StartCpuProfileMethod,
            startGoTrace: StartGoTraceMethod,
            stopCPUProfile: StopCpuProfileMethod,
            stopGoTrace: StopGoTraceMethod,
            getBlockTraceByHash: TraceBlockByHashMethod,
            getBlockTraceByNumber: TraceBlockByNumberMethod,
            getBlockTraceFromFile: TraceBlockFromFileMethod,
            getBlockTrace: TraceBlockMethod,
            getTransactionTrace: TraceTransactionMethod,
            setVerbosity: VerbosityMethod,
            setVerbosityPattern: VmoduleMethod,
            writeBlockProfile: WriteBlockProfileMethod,
            writeMemProfile: WriteMemProfileMethod
        });
    });
});
