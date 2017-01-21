"use strict";
const plugins = require("./qenv.plugins");
;
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
    ;
}
exports.Qenv = Qenv;
;
let getRequiredEnvVars = (pathArg, requiredEnvVarsArray) => {
    let qenvFilePath = plugins.path.join(pathArg, 'qenv.yml');
    let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
    for (let keyArg in qenvFile.vars) {
        requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
    }
    ;
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
    ;
};
let getMissingEnvVars = (requiredEnvVarsArray, availableEnvVarsArray) => {
    return plugins.lodash.difference(requiredEnvVarsArray, availableEnvVarsArray);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMENBQXlDO0FBS3hDLENBQUM7QUFFRjtJQUtJLFlBQVksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxhQUFhLEVBQUMsYUFBYSxHQUFHLElBQUk7UUFKMUUsb0JBQWUsR0FBYSxFQUFFLENBQUE7UUFDOUIscUJBQWdCLEdBQWEsRUFBRSxDQUFBO1FBQy9CLG1CQUFjLEdBQWEsRUFBRSxDQUFBO1FBQzdCLHdCQUFtQixHQUFzQixFQUFFLENBQUE7UUFFdkMsa0JBQWtCLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNwRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDdEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRW5GLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtn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