import validateConfig from './validateConfig';
import dotenv from 'dotenv';

const path = `.env.${process.env.NODE_ENV || 'local'}`;

dotenv.config({ path });

interface Config {
  port: number;
  databaseUrl: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

const config: Config = {
  port: parseInt(process.env.PORT as string, 10),
  databaseUrl: process.env.DATABASE_URL as string,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

export { validateConfig };

export default config;
