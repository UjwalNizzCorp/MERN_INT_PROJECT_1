export const getEnv = (name) => {
  try {
    const env = process.env[name];
    if (!env) {
      if (process.env.NODE_ENV !== "test") {
        throw new Error();
      } else {
        return null;
      }
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
