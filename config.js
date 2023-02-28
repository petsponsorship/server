import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}

export const config = {
  port: required("PORT"),
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
    prot: required("DB_PORT"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  jwt: {
    secretKey: required("JWT_SECRET_KEY"),
    saltRound: required("JWT_SALT"),
    expiredDays: required("JWT_EXPIRED_DAYS"),
    expiredHours: required("JWT_EXPIRED_HOURS"),
  },
  s3: {
    accessKeyId: required("AWS_ACCESS_KEY"),
    secretAccessKey: required("AWS_SECRET_KEY"),
    region: required("AWS_REGION"),
  },
};
