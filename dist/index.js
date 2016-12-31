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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMENBQTBDO0FBS3pDLENBQUM7QUFFRjtJQUtJLFlBQVksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxhQUFhLEVBQUMsYUFBYSxHQUFHLElBQUk7UUFKMUUsb0JBQWUsR0FBWSxFQUFFLENBQUM7UUFDOUIscUJBQWdCLEdBQVksRUFBRSxDQUFDO1FBQy9CLG1CQUFjLEdBQVksRUFBRSxDQUFDO1FBQzdCLHdCQUFtQixHQUFxQixFQUFFLENBQUM7UUFFdkMsa0JBQWtCLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBGLDBCQUEwQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxTQUFTLENB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