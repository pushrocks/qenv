import * as plugins from "./qenv.plugins";

export class Qenv {
    requiredEnvVars:string[];
    availableEnvVars:string[];
    missingEnvVars:string[];
    constructor(basePathArg = process.cwd(),envYmlPathArg){
        this.requiredEnvVars = getRequiredEnvVars(basePathArg);
        this.availableEnvVars = getAvailableEnvVars(this.requiredEnvVars,envYmlPathArg);
        this.missingEnvVars = getMissingEnvVars(this.requiredEnvVars,this.availableEnvVars);
        for(let keyArg in this.missingEnvVars){
            plugins.beautylog.warn(this.missingEnvVars[keyArg] + " is required, but missing!")
        }
    }
};

let getRequiredEnvVars = (pathArg:string):string[] => {
    let result:string[] = [];
    let qenvFilePath = plugins.path.join(pathArg,"qenv.yml");
    let qenvFile = plugins.smartfile.local.toObjectSync(qenvFilePath);
    for(let keyArg in qenvFile.vars){
        result.push(qenvFile.vars[keyArg]);
    }
    return result;
}

let getAvailableEnvVars = (requiredEnvVarsArg:string[],envYmlPathArg:string):string[] => {
    let result = [];
    envYmlPathArg = plugins.path.join(envYmlPathArg,"env.yml")
    let envYml;
    try {
        envYml = plugins.smartfile.local.toObjectSync(envYmlPathArg);
    }
    catch(err){
        envYml = {};
    }
    for(let keyArg in requiredEnvVarsArg){
        let requiredEnvVar:string = requiredEnvVarsArg[keyArg];
        if(process.env[requiredEnvVar]){
            result.push(requiredEnvVar);
        } else if(envYml.hasOwnProperty(requiredEnvVar)){
            process.env[requiredEnvVar] = envYml[requiredEnvVar];
            result.push(requiredEnvVar);
        }
    }
    return result;
}

let getMissingEnvVars = (requiredEnvVarsArray:string[],availableEnvVarsArray:string[]) => {
    return plugins.lodash.difference(requiredEnvVarsArray,availableEnvVarsArray);
}