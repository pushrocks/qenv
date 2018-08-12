import * as plugins from './qenv.plugins';
import { IKeyValueObject } from './qenv.classes.qenv';

export let getRequiredEnvVars = (pathArg: string, requiredEnvVarsArray: string[]) => {
  let qenvFilePath = plugins.path.join(pathArg, 'qenv.yml');
  let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
  for (let keyArg in qenvFile.vars) {
    requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
  }
};

export let getAvailableEnvVars = (
  requiredEnvVarsArg: string[],
  envYmlPathArg: string,
  availableEnvVarsArray: string[],
  keyValueObjectArrayArg: IKeyValueObject[]
) => {
  envYmlPathArg = plugins.path.join(envYmlPathArg, 'env.yml');
  let envYml;
  try {
    envYml = plugins.smartfile.fs.toObjectSync(envYmlPathArg);
  } catch (err) {
    console.log("env file couldn't be found at " + envYmlPathArg);
    envYml = {};
  }
  for (let requiredEnvVar of requiredEnvVarsArg) {
    if (process.env[requiredEnvVar]) {
      availableEnvVarsArray.push(requiredEnvVar);
      keyValueObjectArrayArg.push({
        key: requiredEnvVar,
        value: process.env[requiredEnvVar]
      });
    } else if (envYml.hasOwnProperty(requiredEnvVar)) {
      process.env[requiredEnvVar] = envYml[requiredEnvVar];
      availableEnvVarsArray.push(requiredEnvVar);
      keyValueObjectArrayArg.push({
        key: requiredEnvVar,
        value: process.env[requiredEnvVar]
      });
    }
  }
};

export let getMissingEnvVars = (
  requiredEnvVarsArray: string[],
  availableEnvVarsArray: string[]
): string[] => {
  const missingEnvVars: string[] = [];
  for (const envVar of requiredEnvVarsArray) {
    if (!availableEnvVarsArray.includes(envVar)) {
      missingEnvVars.push(envVar);
    }
  }
  return missingEnvVars;
};
