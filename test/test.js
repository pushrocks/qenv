"use strict";
require("typings-test");
const path = require("path");
const smartchai_1 = require("smartchai");
const index_1 = require("../dist/index");
process.cwd = () => {
    return path.join(__dirname, './assets/');
};
process.env['key1'] = 'original';
let qenvTestObject;
describe('Qenv class', function () {
    it('should create a new class', function () {
        qenvTestObject = new index_1.Qenv(process.cwd(), process.cwd(), false);
    });
    it('key1 should be not be overwritten since it is already present', function () {
        smartchai_1.expect(process.env.key1).to.equal('original');
    });
    it('key2 should be read from Yml', function () {
        smartchai_1.expect(process.env.key2).to.equal('fromYml');
    });
    it('keyValueObjectArray should hold all retrieved values', function () {
        smartchai_1.expect(qenvTestObject.keyValueObjectArray[0].value).to.equal('original');
        smartchai_1.expect(qenvTestObject.keyValueObjectArray[1].value).to.equal('fromYml');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQiw2QkFBNEI7QUFDNUIseUNBQWtDO0FBQ2xDLHlDQUFrQztBQUVsQyxPQUFPLENBQUMsR0FBRyxHQUFHO0lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFBO0FBRWhDLElBQUksY0FBb0IsQ0FBQTtBQUN4QixRQUFRLENBQUMsWUFBWSxFQUFDO0lBQ2xCLEVBQUUsQ0FBQywyQkFBMkIsRUFBQztRQUMzQixjQUFjLEdBQUcsSUFBSSxZQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQywrREFBK0QsRUFBQztRQUMvRCxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyw4QkFBOEIsRUFBQztRQUM5QixrQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNoRCxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxzREFBc0QsRUFBQztRQUN0RCxrQkFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3hFLGtCQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDM0UsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDLENBQUMsQ0FBQSJ9