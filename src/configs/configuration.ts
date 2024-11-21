import * as process from 'node:process';

import { Config } from './config-type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10),
    host: process.env.APP_HOST,
  },
});
