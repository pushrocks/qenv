export interface keyValueObject {
    key: string;
    value: string;
}
export declare class Qenv {
    requiredEnvVars: string[];
    availableEnvVars: string[];
    missingEnvVars: string[];
    keyValueObjectArray: keyValueObject[];
    constructor(basePathArg: string, envYmlPathArg: any, failOnMissing?: boolean);
}
