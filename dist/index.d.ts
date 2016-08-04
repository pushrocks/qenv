export interface IKeyValueObject {
    key: string;
    value: string;
}
export declare class Qenv {
    requiredEnvVars: string[];
    availableEnvVars: string[];
    missingEnvVars: string[];
    keyValueObjectArray: IKeyValueObject[];
    constructor(basePathArg: string, envYmlPathArg: any, failOnMissing?: boolean);
}
