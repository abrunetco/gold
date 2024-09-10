import type { Db, MongoClient } from 'mongodb';
import getColections, { DataContext, applyContext, makeContext, revertContext } from './utils/collections';
import { addDemoUsers } from './utils/generators';

const migrateKey = '20240909171346-generate-users'
export const up = async (db: Db, client: MongoClient) => {
  const cols = getColections(db)
  const context = makeContext(migrateKey)
  addDemoUsers(context)
  await applyContext(db, context).then(ctxt => console.log(`${ctxt.users.length} added`));
}

export const down = async (db: Db, client: MongoClient) => {
  await revertContext(db, migrateKey).then(console.log);
}
