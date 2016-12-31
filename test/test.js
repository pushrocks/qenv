"use strict";
require("typings-test");
const path = require("path");
require("should");
const index_1 = require("../dist/index");
process.cwd = () => {
    return path.join(__dirname, "./assets/");
};
process.env["key1"] = "original";
let qenvTestObject;
describe("Qenv class", function () {
    it("should create a new class", function () {
        qenvTestObject = new index_1.Qenv(process.cwd(), process.cwd(), false);
    });
    it("key1 should be not be overwritten since it is already present", function () {
        process.env.key1.should.equal("original");
    });
    it("key2 should be read from Yml", function () {
        process.env.key2.should.equal("fromYml");
    });
    it("keyValueObjectArray should hold all retrieved values", function () {
        qenvTestObject.keyValueObjectArray[0].value.should.equal("original");
        qenvTestObject.keyValueObjectArray[1].value.should.equal("fromYml");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0Isa0JBQWdCO0FBQ2hCLHlDQUFtQztBQUVuQyxPQUFPLENBQUMsR0FBRyxHQUFHO0lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFBO0FBRWhDLElBQUksY0FBbUIsQ0FBQztBQUN4QixRQUFRLENBQUMsWUFBWSxFQUFDO0lBQ2xCLEVBQUUsQ0FBQywyQkFBMkIsRUFBQztRQUMzQixjQUFjLEdBQUcsSUFBSSxZQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrREFBK0QsRUFBQztRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsc0RBQXNELEVBQUM7UUFDdEQsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUMsQ0FBQyxDQUFDIn0=