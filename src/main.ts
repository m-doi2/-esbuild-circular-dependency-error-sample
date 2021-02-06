import 'reflect-metadata';
import path from 'path';
import { createConnection, getRepository } from 'typeorm';
import { App1Entity } from './app1/entities';

(async() => {
  const connection = await createConnection({
    type: 'sqlite',
    database: './db.sql',
    logging: false,
    entities: [
      path.join(__dirname, 'app1/entities/*.js'),
      path.join(__dirname, 'app2/entities/*.js'),
    ],
  });
  await connection.synchronize(true);
  console.log('synced');

  const app1Repo = await getRepository(App1Entity);
  const count = await app1Repo.count();
  console.log('app1:count', count);
})();
