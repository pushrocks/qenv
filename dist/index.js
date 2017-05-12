"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./qenv.plugins");
class Qenv {
    constructor(basePathArg = process.cwd(), envYmlPathArg, failOnMissing = true) {
        this.requiredEnvVars = [];
        this.availableEnvVars = [];
        this.missingEnvVars = [];
        this.keyValueObjectArray = [];
        getRequiredEnvVars(basePathArg, this.requiredEnvVars);
        getAvailableEnvVars(this.requiredEnvVars, envYmlPathArg, this.availableEnvVars, this.keyValueObjectArray);
        this.missingEnvVars = getMissingEnvVars(this.requiredEnvVars, this.availableEnvVars);
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
}
exports.Qenv = Qenv;
let getRequiredEnvVars = (pathArg, requiredEnvVarsArray) => {
    let qenvFilePath = plugins.path.join(pathArg, 'qenv.yml');
    let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
    for (let keyArg in qenvFile.vars) {
        requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
    }
};
let getAvailableEnvVars = (requiredEnvVarsArg, envYmlPathArg, availableEnvVarsArray, keyValueObjectArrayArg) => {
    envYmlPathArg = plugins.path.join(envYmlPathArg, 'env.yml');
    let envYml;
    try {
        envYml = plugins.smartfile.fs.toObjectSync(envYmlPathArg);
    }
    catch (err) {
        console.log("env file couldn't be found at " + envYmlPathArg);
        envYml = {};
    }
    for (let requiredEnvVar of requiredEnvVarsArg) {
        if (process.env[requiredEnvVar]) {
            availableEnvVarsArray.push(requiredEnvVar);
            keyValueObjectArrayArg.push({
                key: requiredEnvVar,
                value: process.env[requiredEnvVar]
            });
        }
        else if (envYml.hasOwnProperty(requiredEnvVar)) {
            process.env[requiredEnvVar] = envYml[requiredEnvVar];
            availableEnvVarsArray.push(requiredEnvVar);
            keyValueObjectArrayArg.push({
                key: requiredEnvVar,
                value: process.env[requiredEnvVar]
            });
        }
    }
};
let getMissingEnvVars = (requiredEnvVarsArray, availableEnvVarsArray) => {
    return plugins.lodash.difference(requiredEnvVarsArray, availableEnvVarsArray);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF5QztBQU96QztJQUtFLFlBQWEsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsYUFBYSxHQUFHLElBQUk7UUFKN0Usb0JBQWUsR0FBYSxFQUFFLENBQUE7UUFDOUIscUJBQWdCLEdBQWEsRUFBRSxDQUFBO1FBQy9CLG1CQUFjLEdBQWEsRUFBRSxDQUFBO1FBQzdCLHdCQUFtQixHQUFzQixFQUFFLENBQUE7UUFFekMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDekcsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRXBGLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDekIsT0FB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