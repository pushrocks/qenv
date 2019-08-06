import * as path from 'path';
import { tap, expect } from '@pushrocks/tapbundle';
import * as qenv from '../ts/index';

process.env['key1'] = 'original';

let testQenv: qenv.Qenv;

tap.test('should create a new class', async () => {
  testQenv = new qenv.Qenv(path.join(__dirname, 'assets'), path.join(__dirname, 'assets'), false);
  expect(testQenv).to.be.instanceof(qenv.Qenv);
});

tap.test('key1 should be not be overwritten since it is already present', async () => {
  expect(testQenv.getEnvVarRequired('key1')).to.equal('original');
  expect(testQenv.getEnvVarOnDemand('key1')).to.equal('original');
});

tap.test('key2 should be read from Yml', async () => {
  expect(testQenv.getEnvVarRequired('key2')).to.equal('fromYml');
  expect(testQenv.getEnvVarOnDemand('key2')).to.equal('fromYml');
});

tap.test('keyValueObjectArray should hold all retrieved values', async () => {
  expect(testQenv.keyValueObject.key1).to.equal('original');
  expect(testQenv.keyValueObject.key2).to.equal('fromYml');
});

tap.start();
