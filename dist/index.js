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
        //handle missing variables
        if (this.missingEnvVars.length > 0) {
            plugins.beautylog.info("Required Env Vars are:");
            console.log(this.requiredEnvVars);
            plugins.beautylog.error("However some Env variables could not be resolved:");
            console.log(this.missingEnvVars);
            if (failOnMissing) {
                plugins.beautylog.error("Exiting!");
                process.exit(1);
            }
        }
    }
    ;
}
exports.Qenv = Qenv;
;
let getRequiredEnvVars = (pathArg, requiredEnvVarsArray) => {
    let qenvFilePath = plugins.path.join(pathArg, "qenv.yml");
    let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
    for (let keyArg in qenvFile.vars) {
        requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
    }
    ;
};
let getAvailableEnvVars = (requiredEnvVarsArg, envYmlPathArg, availableEnvVarsArray, keyValueObjectArrayArg) => {
    envYmlPathArg = plugins.path.join(envYmlPathArg, "env.yml");
    let envYml;
    try {
        envYml = plugins.smartfile.fs.toObjectSync(envYmlPathArg);
    }
    catch (err) {
        plugins.beautylog.log("env file couldn't be found at " + envYmlPathArg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0sZ0JBQWdCLENBQUMsQ0FBQTtBQUt6QyxDQUFDO0FBRUY7SUFLSSxZQUFZLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsYUFBYSxFQUFDLGFBQWEsR0FBRyxJQUFJO1FBSjFFLG9CQUFlLEdBQVksRUFBRSxDQUFDO1FBQzlCLHFCQUFnQixHQUFZLEVBQUUsQ0FBQztRQUMvQixtQkFBYyxHQUFZLEVBQUUsQ0FBQztRQUM3Qix3QkFBbUIsR0FBcUIsRUFBRSxDQUFDO1FBRXZDLGtCQUFrQixDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVwRiwwQkFBMEI7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7WUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFBLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FB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