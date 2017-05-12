"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./qenv.plugins");
exports.getRequiredEnvVars = (pathArg, requiredEnvVarsArray) => {
    let qenvFilePath = plugins.path.join(pathArg, 'qenv.yml');
    let qenvFile = plugins.smartfile.fs.toObjectSync(qenvFilePath);
    for (let keyArg in qenvFile.vars) {
        requiredEnvVarsArray.push(qenvFile.vars[keyArg]);
    }
};
exports.getAvailableEnvVars = (requiredEnvVarsArg, envYmlPathArg, availableEnvVarsArray, keyValueObjectArrayArg) => {
    envYmlPathArg = plugins.path.join(envYmlPathArg, 'env.yml');
    let envYml;
    try {
        envYml = plugins.smartfile.fs.toObjectSync(envYmlPathArg);
    }
    catch (err) {
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
        }
        else if (envYml.hasOwnProperty(requiredEnvVar)) {
            process.env[requiredEnvVar] = envYml[requiredEnvVar];
            availableEnvVarsArray.push(requiredEnvVar);
            keyValueObjectArrayArg.push({
                key: requiredEnvVar,
                value: process.env[requiredEnvVar]
            });
        }
    }
};
exports.getMissingEnvVars = (requiredEnvVarsArray, availableEnvVarsArray) => {
    return plugins.lodash.difference(requiredEnvVarsArray, availableEnvVarsArray);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicWVudi5oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvcWVudi5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXlDO0FBRzlCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxPQUFlLEVBQUUsb0JBQThCO0lBQzlFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDOUQsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBRVUsUUFBQSxtQkFBbUIsR0FBRyxDQUMvQixrQkFBNEIsRUFDNUIsYUFBcUIsRUFDckIscUJBQStCLEVBQy9CLHNCQUF5QztJQUV6QyxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzNELElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxDQUFDO1FBQ0gsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsYUFBYSxDQUFDLENBQUE7UUFDN0QsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxjQUFjLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzFDLHNCQUFzQixDQUFDLElBQUksQ0FBQztnQkFDMUIsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFFLGNBQWMsQ0FBRTthQUNyQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUUsY0FBYyxDQUFFLEdBQUcsTUFBTSxDQUFFLGNBQWMsQ0FBRSxDQUFBO1lBQ3hELHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMxQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBRSxjQUFjLENBQUU7YUFDckMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUE7QUFFVSxRQUFBLGlCQUFpQixHQUFHLENBQUMsb0JBQThCLEVBQUUscUJBQStCO0lBQzdGLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO0FBQy9FLENBQUMsQ0FBQSJ9