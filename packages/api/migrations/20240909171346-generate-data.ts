import type { Db } from 'mongodb'
import { applyContext, makeContext, revertContext } from './utils/collections'
import * as g from './utils/generators'

const migrateKey = '20240909171346-generate-data'
export const up = async (db: Db) => {
  const context = makeContext(migrateKey)
  g.addDemoUsers(context, 500)
  g.addDemoCategories(context)
  g.addDemoPrices(context, 10000)
  g.addDemoBalances(context, 500)
  g.addDemoProducts(context, 100)
  await applyContext(db, context).then((ctxt) => console.log(`${ctxt.users.length} added`))
}

export const down = async (db: Db) => {
  await revertContext(db, migrateKey).then(console.log)
}
