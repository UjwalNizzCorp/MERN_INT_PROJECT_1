/**
 * @author: Jaseem
 * @description: This file is used to get the environment variables from the .env file.
 * @param {string} name - The name of the environment variable.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is not found and the NODE_ENV is not test.
 */
export const getEnv = (name: string): string => {
  try {
    const env = process.env[name];
    if (typeof env === "undefined" || env === "") {
      throw new Error(`Erron in Getting ${name} env`);
    }
    return env;
  } catch (error: any) {
    error.message && console.log(error.message);
    process.exit(1);
  }
};

export const PORT = getEnv("PORT");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
