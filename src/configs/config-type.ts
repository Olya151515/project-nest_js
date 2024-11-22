export type Config = {
  app: AppConfig;
  jwt: JwtConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
