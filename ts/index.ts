import * as plugins from "./qenv.plugins";

export class qenv {
    requiredEnvVars:string[];
    availableEnvVars:string[];
    missingEnvVars:string[];
    constructor(basePathArg = process.cwd(),envYmlPathArg){
        this.requiredEnvVars = getRequiredEnvVars(basePathArg);
        this.availableEnvVars = getAvailableEnvVars(this.requiredEnvVars,envYmlPathArg);
        this.missingEnvVars = getMissingEnvVars(this.requiredEnvVars,this.availableEnvVars);
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
    let envYml;
    try {
        envYml = plugins.smartfile.local.toObjectSync(envYmlPathArg);
    }
    catch(err){
        envYml = {};
    }
    for(let keyArg in requiredEnvVarsArg){
        let envVar:string = requiredEnvVarsArg[keyArg];
        if(process.env[envVar]){
            result.push(envVar);
        } else if(envYml.hasOwnPropery(envVar)){
            process.env[envVar] = envYml.envVar;
            result.push(envVar);
        }
    }
    return result;
}

let getMissingEnvVars = (requiredEnvVarsArray:string[],availableEnvVarsArray:string[]) => {
    return plugins.lodash.difference(requiredEnvVarsArray,availableEnvVarsArray);
}