"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("./qenv.helpers");
class Qenv {
    constructor(basePathArg = process.cwd(), envYmlPathArg, failOnMissing = true) {
        this.requiredEnvVars = [];
        this.availableEnvVars = [];
        this.missingEnvVars = [];
        this.keyValueObjectArray = [];
        helpers.getRequiredEnvVars(basePathArg, this.requiredEnvVars);
        helpers.getAvailableEnvVars(this.requiredEnvVars, envYmlPathArg, this.availableEnvVars, this.keyValueObjectArray);
        this.missingEnvVars = helpers.getMissingEnvVars(this.requiredEnvVars, this.availableEnvVars);
        // handle missing variables
        if (this.missingEnvVars.length > 0) {
            console.info('Required Env Vars are:');
            console.log(this.requiredEnvVars);
            console.error('However some Env variables could not be resolved:');
            console.log(this.missingEnvVars);
            if (failOnMissing) {
                console.error('Exiting!');
                process.exit(1);
            }
        }
    }
    getEnvVar(envVarName) {
        return process.env[envVarName];
    }
}
exports.Qenv = Qenv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicWVudi5jbGFzc2VzLnFlbnYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9xZW52LmNsYXNzZXMucWVudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUF5QztBQU96QztJQUtFLFlBQWEsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsYUFBYSxHQUFHLElBQUk7UUFKN0Usb0JBQWUsR0FBYSxFQUFFLENBQUE7UUFDOUIscUJBQWdCLEdBQWEsRUFBRSxDQUFBO1FBQy9CLG1CQUFjLEdBQWEsRUFBRSxDQUFBO1FBQzdCLHdCQUFtQixHQUFzQixFQUFFLENBQUE7UUFFekMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDN0QsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNqSCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRTVGLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLENBQUUsVUFBVTtRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0NBQ0Y7QUExQkQsb0JBMEJDIn0=