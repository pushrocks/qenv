import * as plugins from "./qenv.plugins";

export class qenv {
    envVarsRequired:string[];
    envVarsAvailable:string[];
    envVarsMissing:string[];
    constructor(basePathArg = "./qenv.yml",envYmlPathArg){
        this.envVarsRequired = getEnvVarsRequired(basePathArg);
        this.envVarsAvailable;
    }
};

let getEnvVarsRequired = (pathArg:string):string[] => {
    let result:string[] = [];
    let qenvFilePath = plugins.path.join(pathArg,"qenv.yml");
    let qenvFile = plugins.smartfile.local.toObjectSync(qenvFilePath);
    for(let keyArg in qenvFile.vars){
        result.push(qenvFile.vars[keyArg]);
    }
    return result;
}

let getEnvVarsAvailable = (requiredEnvVarsArg:string[]):string[] => {
    let result = [];
    for(let keyArg in requiredEnvVarsArg){
        let envVar = requiredEnvVarsArg[keyArg];
        if(process.env[envVar]){
            result.push(envVar);
        } else {
            
        }
    }
    return result;
}