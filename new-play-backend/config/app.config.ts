interface DatabaseConfig {
  url: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

interface Config {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
}

export const configuration = (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  },
});