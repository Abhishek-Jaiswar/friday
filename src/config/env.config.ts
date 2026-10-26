import { z } from "zod";
import { configDotenv } from "dotenv";
configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1, { error: "Database string is required" }),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Env validation failed:", error);
      error.issues.forEach((err) => {
        console.error(`${err.path.join(".")}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const Env = parseEnv();

export const isDevelopment = Env.NODE_ENV === "development";
export const isProduction = Env.NODE_ENV === "production";
