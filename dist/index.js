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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMENBQXlDO0FBS3hDLENBQUM7QUFFRjtJQUtJLFlBQVksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxhQUFhLEVBQUMsYUFBYSxHQUFHLElBQUk7UUFKMUUsb0JBQWUsR0FBYSxFQUFFLENBQUE7UUFDOUIscUJBQWdCLEdBQVksRUFBRSxDQUFBO1FBQzlCLG1CQUFjLEdBQVksRUFBRSxDQUFBO1FBQzVCLHdCQUFtQixHQUFxQixFQUFFLENBQUE7UUFFdEMsa0JBQWtCLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNwRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDdEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRW5GLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtn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