import * as plugins from './qenv.plugins';
plugins.smartlog.defaultLogger.enableConsole();

/**
 * class Qenv
 * allows to make assertions about the environments while being more flexibel in how to meet them
 */
export class Qenv {
  public requiredEnvVars: string[] = [];
  public availableEnvVars: string[] = [];
  public missingEnvVars: string[] = [];
  public keyValueObject: { [key: string]: any } = {};
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
      'env.json'
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
        this.logger.log('error', 'Exiting!');
        process.exit(1);
      } else {
        this.logger.log('warn', 'qenv is not set to fail on missing environment variables');
      }
    }
  }

  /**
   * only gets an environment variable if it is required within a read qenv.yml file
   * @param envVarName
   */
  public getEnvVarRequired(envVarName): string {
    return this.keyValueObject[envVarName];
  }

  /**
   * tries to get any env var even if it is not required
   * @param wantedEnvVar
   */
  public getEnvVarOnDemand(wantedEnvVar: string): string {
    let envVarFromEnvironmentVariable: string;
    let envVarFromEnvJsonFile: string;
    let envVarFromDockerSecret: string;
    let dockerSecretJson: string;

    // env var check
    if (process.env[wantedEnvVar]) {
      this.availableEnvVars.push(wantedEnvVar);
      envVarFromEnvironmentVariable = process.env[wantedEnvVar];
    }

    // env file check
    // lets determine the actual env yml
    let envJsonFileAsObject;
    try {
      envJsonFileAsObject = plugins.smartfile.fs.toObjectSync(this.envFilePathAbsolute);
    } catch (err) {
      envJsonFileAsObject = {};
    }
    if (envJsonFileAsObject.hasOwnProperty(wantedEnvVar)) {
      envVarFromEnvJsonFile = envJsonFileAsObject[wantedEnvVar];
    }

    // docker secret check
    if (
      plugins.smartfile.fs.isDirectory('/run') &&
      plugins.smartfile.fs.isDirectory('/run/secrets') &&
      plugins.smartfile.fs.fileExistsSync(`/run/secrets/${wantedEnvVar}`)
    ) {
      envVarFromDockerSecret = plugins.smartfile.fs.toStringSync(`/run/secrets/${wantedEnvVar}`);
    }

    // docker secret.json
    if (
      plugins.smartfile.fs.isDirectory('/run') &&
      plugins.smartfile.fs.isDirectory('/run/secrets')
    ) {
      const availableSecrets = plugins.smartfile.fs.listAllItemsSync('/run/secrets');
      for (const secret of availableSecrets) {
        if (secret.includes('secret.json') && !envVarFromDockerSecret) {
          const secretObject = plugins.smartfile.fs.toObjectSync(`/run/secrets/${secret}`);
          envVarFromDockerSecret = secretObject[wantedEnvVar];
        }
      }
    }

    // warn if there is more than one candidate
    const availableCcandidates: any[] = [];
    [
      envVarFromEnvironmentVariable,
      envVarFromEnvJsonFile,
      envVarFromDockerSecret,
      dockerSecretJson
    ].forEach(candidate => {
      if (candidate) {
        availableCcandidates.push(candidate);
      }
    });
    if (availableCcandidates.length > 1) {
      this.logger.log(
        'warn',
        `found multiple candidates for ${wantedEnvVar} Choosing in the order of envVar, envFileVar, dockerSecret, dockerSecretJson`
      );
      console.log(availableCcandidates);
    }

    switch (true) {
      case !!envVarFromEnvironmentVariable:
        this.logger.log('ok', `found ${wantedEnvVar} as environment variable`);
        return envVarFromEnvironmentVariable;
      case !!envVarFromEnvJsonFile:
        this.logger.log('ok', `found ${wantedEnvVar} as env.json variable`);
        return envVarFromEnvJsonFile;
      case !!envVarFromDockerSecret:
        this.logger.log('ok', `found ${wantedEnvVar} as docker secret`);
        return envVarFromDockerSecret;
      case !!dockerSecretJson:
        this.logger.log('ok', `found ${wantedEnvVar} as docker secret.json`);
        return dockerSecretJson;
      default:
        this.logger.log(
          'warn',
          `could not find the wanted environment variable ${wantedEnvVar} anywhere`
        );
        return;
    }
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
      this.logger.log(
        'warn',
        `qenv (promised environment): ./qenv.yml File does not contain a 'required' Array! This might be ok though.`
      );
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
        this.keyValueObject[requiredEnvVar] = chosenVar;
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
