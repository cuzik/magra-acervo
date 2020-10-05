import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';
import * as path from 'path';

export const getTestConnectionOptions = async (): Promise<ConnectionOptions> => {
  const options = await getConnectionOptions();
  return {
    ...options,
    name: undefined,
    dropSchema: true,
    entities: [path.join(process.cwd(), './src/**/**.entity.ts')],
  };
};

export const TypeOrmModuleTest = TypeOrmModule.forRootAsync({
  useFactory: getTestConnectionOptions,
});

async function seed(): Promise<void> {
  const options = await getTestConnectionOptions();
  const connection = await createConnection(options);

  await connection.dropDatabase();
  await connection.synchronize();

  // here we put seed

  await connection.close();
}

if (process.env.RUN_SEED) {
  seed();
}
