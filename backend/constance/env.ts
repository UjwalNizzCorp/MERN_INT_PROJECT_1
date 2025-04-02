/**
 * @author: Jaseem
 * @description: This file is used to get the environment variables from the .env file.
 * @param {string} name - The name of the environment variable.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is not found and the NODE_ENV is not test.
 */
export const getEnv = (name: string) => {
  try {
    const env = process.env[name];
    if (typeof env === "undefined") {
      //   if (process.env.NODE_ENV !== "test") {
      throw new Error();
      //   } else {
      //     return null;
      //   }
    }
    return env;
  } catch (error) {
    console.log(`Erron in Getting ${name} env`);
    process.exit(1);
  }
};

export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const PORT = getEnv("PORT");
