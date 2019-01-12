import * as plugins from './qenv.plugins';

export interface IKeyValueObject {
  key: string;
  value: string;
}

/**
 * class Qenv
 * allows to make assertions about the environments while being more flexibel in how to meet them
 */
export class Qenv {
  public requiredEnvVars: string[] = [];
  public availableEnvVars: string[] = [];
  public missingEnvVars: string[] = [];
  public keyValueObjectArray: IKeyValueObject[] = [];
  public logger: plugins.smartlog.Smartlog;

  // filePaths
  public qenvFilePathAbsolute: string;
  public envFilePathAbsolute: string;

  constructor(
    qenvFileBasePathArg = process.cwd(),
    envFileBasePathArg,
    failOnMissing = true,
    loggerArg: plugins.smartlog.Smartlog = plugins.smartlog.defaultLogger
  ) {
    this.logger = loggerArg;

    // lets make sure paths are absolute
    this.qenvFilePathAbsolute = plugins.path.join(
      plugins.path.resolve(qenvFileBasePathArg),
      'qenv.yml'
    );
    this.envFilePathAbsolute = plugins.path.join(
      plugins.path.resolve(envFileBasePathArg),
      'env.yml'
    );

    this.getRequiredEnvVars();
    this.getAvailableEnvVars();

    this.missingEnvVars = this.getMissingEnvVars();

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

  /**
   * only gets an environment variable if it is required within a read qenv.yml file
   * @param envVarName
   */
  public getEnvVarRequired(envVarName): string {
    return process.env[envVarName];
  }

  /**
   * tries to get any env var even if it is not required
   * @param requiredEnvVar
   */
  public getEnvVarOnDemand(requiredEnvVar: string): string {
    // lets determine the actual env yml
    let envYml;
    try {
      envYml = plugins.smartfile.fs.toObjectSync(this.envFilePathAbsolute);
    } catch (err) {
      console.log("env file couldn't be found at " + this.envFilePathAbsolute);
      envYml = {};
    }
    let envVar: string;
    let envFileVar: string;
    let dockerSecret: string;
    let dockerSecretJson: string;

    // env var check
    if (process.env[requiredEnvVar]) {
      this.availableEnvVars.push(requiredEnvVar);
      envVar = process.env[requiredEnvVar];
    }

    // env file check
    if (envYml.hasOwnProperty(requiredEnvVar)) {
      envFileVar = envYml[requiredEnvVar];
      this.availableEnvVars.push(requiredEnvVar);
    }

    // docker secret check
    if (
      plugins.smartfile.fs.isDirectory('/run') &&
      plugins.smartfile.fs.isDirectory('/run/secrets') &&
      plugins.smartfile.fs.fileExists(`/run/secrets/${requiredEnvVar}`)
    ) {
      dockerSecret = plugins.smartfile.fs.toStringSync(`/run/secrets/${requiredEnvVar}`);
    }

    // docker secret.json
    if (
      plugins.smartfile.fs.isDirectory('/run') &&
      plugins.smartfile.fs.isDirectory('/run/secrets') &&
      plugins.smartfile.fs.fileExists(`/run/secrets/secret.json`)
    ) {
      const secretObject = plugins.smartfile.fs.toObjectSync('/run/secrets/secret.json');
      dockerSecret = secretObject[requiredEnvVar];
    }

    // warn if there is more than one candidate
    let candidatesCounter = 0;
    [envVar, envFileVar, dockerSecret, dockerSecretJson].forEach(candidate => {
      if (candidate) {
        candidatesCounter++;
      }
    });
    if (candidatesCounter > 1) {
      this.logger.log(
        'warn',
        `found multiple candidates for ${requiredEnvVar} Choosing in the order of envVar, envFileVar, dockerSecret, dockerSecretJson`
      );
    }

    let chosenVar: string = null;
    if (envVar) {
      chosenVar = envVar;
    } else if (envFileVar) {
      chosenVar = envFileVar;
    } else if (dockerSecret) {
      chosenVar = dockerSecret;
    } else if (dockerSecretJson) {
      chosenVar = dockerSecretJson;
    }
    return chosenVar;
  }

  /**
   * gets the required env values
   */
  private getRequiredEnvVars = () => {
    let qenvFile: any = {};
    if (plugins.smartfile.fs.fileExistsSync(this.qenvFilePathAbsolute)) {
      qenvFile = plugins.smartfile.fs.toObjectSync(this.qenvFilePathAbsolute);
    }
    if (!qenvFile || !qenvFile.required || !Array.isArray(qenvFile.required)) {
      this.logger.log('warn', `env File does not contain a 'required' Array!`);
    } else {
      for (const keyArg of Object.keys(qenvFile.required)) {
        this.requiredEnvVars.push(qenvFile.required[keyArg]);
      }
    }
  };

  /**
   * gets the available env vars
   */
  private getAvailableEnvVars = () => {
    for (const requiredEnvVar of this.requiredEnvVars) {
      const chosenVar = this.getEnvVarOnDemand(requiredEnvVar);
      if (chosenVar) {
        this.availableEnvVars.push(requiredEnvVar);
        process.env[requiredEnvVar] = chosenVar;
        this.keyValueObjectArray.push({
          key: requiredEnvVar,
          value: chosenVar
        });
      }
    }
  };

  /**
   * gets missing env vars
   */
  private getMissingEnvVars = (): string[] => {
    const missingEnvVars: string[] = [];
    for (const envVar of this.requiredEnvVars) {
      if (!this.availableEnvVars.includes(envVar)) {
        missingEnvVars.push(envVar);
      }
    }
    return missingEnvVars;
  };
}
