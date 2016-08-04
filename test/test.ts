import "typings-test";
import * as path from "path";
import "should";
import {Qenv} from "../dist/index";

process.cwd = () => {
    return path.join(__dirname,"./assets/");
}

process.env["key1"] = "original"

let qenvTestObject:Qenv;
describe("Qenv class",function(){
    it("should create a new class",function(){
        qenvTestObject = new Qenv(process.cwd(),process.cwd(),false);
    });
    it("key1 should be not be overwritten since it is already present",function(){
        process.env.key1.should.equal("original");
    });
    it("key2 should be read from Yml",function(){
        process.env.key2.should.equal("fromYml");
    });
    it("keyValueObjectArray should hold all retrieved values",function(){
        qenvTestObject.keyValueObjectArray[0].value.should.equal("original");
        qenvTestObject.keyValueObjectArray[1].value.should.equal("fromYml");
    })

});