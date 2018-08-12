import * as path from 'path';
import { tap, expect } from '@pushrocks/tapbundle';
import * as qenv from '../ts/index';

process.env['key1'] = 'original';

let qenvTestObject: qenv.Qenv;

tap.test('should create a new class', async () => {
  qenvTestObject = new qenv.Qenv(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'assets'),
    false
  );
  expect(qenvTestObject).to.be.instanceof(qenv.Qenv);
});

tap.test('key1 should be not be overwritten since it is already present', async () => {
  expect(process.env.key1).to.equal('original');
});

tap.test('key2 should be read from Yml', async () => {
  expect(process.env.key2).to.equal('fromYml');
});

tap.test('keyValueObjectArray should hold all retrieved values', async () => {
  expect(qenvTestObject.keyValueObjectArray[0].value).to.equal('original');
  expect(qenvTestObject.keyValueObjectArray[1].value).to.equal('fromYml');
});

tap.start();
