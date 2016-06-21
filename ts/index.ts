import * as plugins from "./qenv.plugins";

export class Qenv {
    requiredEnvVars:string[];
    availableEnvVars:string[];
    missingEnvVars:string[];
    constructor(basePathArg = process.cwd(),envYmlPathArg,failOnMissing = true){
        this.requiredEnvVars = getRequiredEnvVars(basePathArg);
        this.availableEnvVars = getAvailableEnvVars(this.requiredEnvVars,envYmlPathArg);
        this.missingEnvVars = getMissingEnvVars(this.requiredEnvVars,this.availableEnvVars);
        
        //handle missing variables
        if (this.missingEnvVars.length > 0){
            plugins.beautylog.error("Some Env variables could not be resolved:")
            console.log(this.missingEnvVars);
            if(failOnMissing){
                plugins.beautylog.error("Exiting!")
                process.exit(1);
            }
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
        plugins.beautylog.log("env file couldn't be found at " + envYmlPathArg)
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