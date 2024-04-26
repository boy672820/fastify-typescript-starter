import config from '@config';
import mongoose from 'mongoose';

export default async (): Promise<void> => {
  await mongoose.connect(config.databaseUrl, {});
};
