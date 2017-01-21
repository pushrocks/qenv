import 'typings-test'
import * as path from 'path'
import { expect } from 'smartchai'
import {Qenv} from '../dist/index'

process.cwd = () => {
    return path.join(__dirname,'./assets/')
}

process.env['key1'] = 'original'

let qenvTestObject:Qenv
describe('Qenv class',function(){
    it('should create a new class',function(){
        qenvTestObject = new Qenv(process.cwd(),process.cwd(),false)
    })
    it('key1 should be not be overwritten since it is already present',function(){
        expect(process.env.key1).to.equal('original')
    })
    it('key2 should be read from Yml',function(){
        expect(process.env.key2).to.equal('fromYml')
    })
    it('keyValueObjectArray should hold all retrieved values',function(){
        expect(qenvTestObject.keyValueObjectArray[0].value).to.equal('original')
        expect(qenvTestObject.keyValueObjectArray[1].value).to.equal('fromYml')
    })

})