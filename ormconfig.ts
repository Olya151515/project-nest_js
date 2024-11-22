import * as process from 'node:process';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

import configuration from './src/configs/configuration';

dotenv.config();
const config = configuration().database;
console.log(
  path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
);
export default new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.name,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
