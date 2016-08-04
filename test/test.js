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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUNoQix3QkFBbUIsZUFBZSxDQUFDLENBQUE7QUFFbkMsT0FBTyxDQUFDLEdBQUcsR0FBRztJQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxXQUFXLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUE7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQTtBQUVoQyxJQUFJLGNBQW1CLENBQUM7QUFDeEIsUUFBUSxDQUFDLFlBQVksRUFBQztJQUNsQixFQUFFLENBQUMsMkJBQTJCLEVBQUM7UUFDM0IsY0FBYyxHQUFHLElBQUksWUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyw4QkFBOEIsRUFBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHNEQUFzRCxFQUFDO1FBQ3RELGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEUsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDLENBQUMsQ0FBQyJ9