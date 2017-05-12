import { IKeyValueObject } from './qenv.classes.qenv';
export declare let getRequiredEnvVars: (pathArg: string, requiredEnvVarsArray: string[]) => void;
export declare let getAvailableEnvVars: (requiredEnvVarsArg: string[], envYmlPathArg: string, availableEnvVarsArray: string[], keyValueObjectArrayArg: IKeyValueObject[]) => void;
export declare let getMissingEnvVars: (requiredEnvVarsArray: string[], availableEnvVarsArray: string[]) => any;
