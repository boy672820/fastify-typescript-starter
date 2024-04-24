import validateConfig from './validateConfig';
import dotenv from 'dotenv';

const path = `.env.${process.env.NODE_ENV || 'local'}`;
console.log(path);

dotenv.config({ path });

export { validateConfig };

export default {
  port: parseInt(process.env.PORT || '3000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;
