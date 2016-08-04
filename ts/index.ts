import * as plugins from "./qenv.plugins";

export interface IKeyValueObject {
    key: string,
    value: string
};

export class Qenv {
    requiredEnvVars:string[] = [];
    availableEnvVars:string[] = [];
    missingEnvVars:string[] = [];
    keyValueObjectArray:IKeyValueObject[] = [];
    constructor(basePathArg = process.cwd(),envYmlPathArg,failOnMissing = true){
        getRequiredEnvVars(basePathArg,this.requiredEnvVars);
        getAvailableEnvVars(this.requiredEnvVars,envYmlPathArg,this.availableEnvVars,this.keyValueObjectArray);
        this.missingEnvVars = getMissingEnvVars(this.requiredEnvVars,this.availableEnvVars);
        
        //handle missing variables
        if (this.missingEnvVars.length > 0){
            plugins.beautylog.info("Required Env Vars are:")
            console.log(this.requiredEnvVars);
            plugins.beautylog.error("However some Env variables could not be resolved:");
            console.log(this.missingEnvVars);
            if(failOnMissing){
                plugins.beautylog.error("Exiting!")
                process.exit(1);
            }
        }
    };
};

let getRequiredEnvVars = (pathArg:string, requiredEnvVarsArray:string[]) => {
    let qenvFilePath = plugins.path.join(pathArg,"qenv.yml");
    let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
    for(let keyArg in qenvFile.vars){
        requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
    };
}



let getAvailableEnvVars = (requiredEnvVarsArg:string[],envYmlPathArg:string,availableEnvVarsArray:string[],keyValueObjectArrayArg:IKeyValueObject[]) => {
    envYmlPathArg = plugins.path.join(envYmlPathArg,"env.yml")
    let envYml;
    try {
        envYml = plugins.smartfile.fs.toObjectSync(envYmlPathArg);
    }
    catch(err){
        plugins.beautylog.log("env file couldn't be found at " + envYmlPathArg)
        envYml = {};
    }
    for(let requiredEnvVar of requiredEnvVarsArg){
        if(process.env[requiredEnvVar]){
            availableEnvVarsArray.push(requiredEnvVar);
            keyValueObjectArrayArg.push({
                key: requiredEnvVar,
                value: process.env[requiredEnvVar]
            });
        } else if(envYml.hasOwnProperty(requiredEnvVar)){
            process.env[requiredEnvVar] = envYml[requiredEnvVar];
            availableEnvVarsArray.push(requiredEnvVar);
            keyValueObjectArrayArg.push({
                key: requiredEnvVar,
                value: process.env[requiredEnvVar]
            });
        }
    };
};

let getMissingEnvVars = (requiredEnvVarsArray:string[],availableEnvVarsArray:string[]) => {
    return plugins.lodash.difference(requiredEnvVarsArray,availableEnvVarsArray);
};