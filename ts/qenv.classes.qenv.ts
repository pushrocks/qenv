import * as plugins from './qenv.plugins';
import * as helpers from './qenv.helpers';

export interface IKeyValueObject {
  key: string;
  value: string;
}

export class Qenv {
  requiredEnvVars: string[] = [];
  availableEnvVars: string[] = [];
  missingEnvVars: string[] = [];
  keyValueObjectArray: IKeyValueObject[] = [];
  constructor(basePathArg = process.cwd(), envYmlPathArg, failOnMissing = true) {
    basePathArg = plugins.path.resolve(basePathArg);
    envYmlPathArg = plugins.path.resolve(envYmlPathArg);
    helpers.getRequiredEnvVars(basePathArg, this.requiredEnvVars);
    helpers.getAvailableEnvVars(
      this.requiredEnvVars,
      envYmlPathArg,
      this.availableEnvVars,
      this.keyValueObjectArray
    );
    this.missingEnvVars = helpers.getMissingEnvVars(this.requiredEnvVars, this.availableEnvVars);

    // handle missing variables
    if (this.missingEnvVars.length > 0) {
      console.info('Required Env Vars are:');
      console.log(this.requiredEnvVars);
      console.error('However some Env variables could not be resolved:');
      console.log(this.missingEnvVars);
      if (failOnMissing) {
        console.error('Exiting!');
        process.exit(1);
      }
    }
  }

  getEnvVar(envVarName): string {
    return process.env[envVarName];
  }
}
