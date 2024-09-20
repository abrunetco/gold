import type { Db } from 'mongodb'
import { applyContext, makeContext, revertContext } from './utils/collections'
import { addDemoBalances, addDemoCategories, addDemoPrices, addDemoUsers } from './utils/generators'

const migrateKey = '20240909171346-generate-data'
export const up = async (db: Db) => {
  const context = makeContext(migrateKey)
  addDemoUsers(context, 500)
  addDemoCategories(context)
  addDemoPrices(context, 10000)
  addDemoBalances(context, 500)
  await applyContext(db, context).then((ctxt) => console.log(`${ctxt.users.length} added`))
}

export const down = async (db: Db) => {
  await revertContext(db, migrateKey).then(console.log)
}
