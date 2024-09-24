import assert from 'assert'
import { Db } from 'mongodb'
import { uid } from 'uid'
import {
  Balance,
  balancePath,
  Category,
  categoryPath,
  Config,
  configPath,
  EntityName,
  GoldPrice,
  goldPricePath,
  Product,
  productPath,
  User,
  userPath,
  Media
} from '../../src/client'
import { Common } from '../../src/shared/common'

export const generatorUID = 'e139584c'

interface SeqModel {
  model: EntityName
  last: number
}

export default function getColections(db: Db) {
  return {
    configs: db.collection<Config>(configPath),
    seq: db.collection<SeqModel>('_seq'),
    users: db.collection<User>(userPath),
    categories: db.collection<Category>(categoryPath),
    goldPrices: db.collection<GoldPrice>(goldPricePath),
    balances: db.collection<Balance>(balancePath),
    products: db.collection<Product>(productPath),
    medias: db.collection<Media>('medias')
  }
}

export function commons(): Common {
  return {
    // _id: new ObjectId(),
    createdAt: new Date().getTime(),
    uid: uid(16),
    readonly: false,
    createdBy: generatorUID
  }
}

export const userCommons = {
  isVerified: true,
  verifyShortToken: null,
  resetAttempts: null,
  resetExpires: null,
  resetShortToken: null,
  verifyChanges: {},
  resetToken: null,
  verifyExpires: null
} as const

export interface TestMeta {
  meta?: any
}

export interface DataContext {
  migrateKey: string
  users: Array<User & TestMeta>
  categories: Array<Category & TestMeta>
  goldPrices: Array<GoldPrice & TestMeta>
  balances: Array<Balance & TestMeta>
  products: Array<Product & TestMeta>
  medias: Array<Media & TestMeta>
}

export const makeContext = (migrateKey: string): DataContext => ({
  migrateKey,
  users: [],
  categories: [],
  goldPrices: [],
  products: [],
  balances: [],
  medias: []
})

export async function applyContext(db: Db, ctxt: DataContext) {
  const cols = getColections(db)

  assert(ctxt.users.length)
  assert(ctxt.categories.length)
  assert(ctxt.goldPrices.length)
  assert(ctxt.products.length)
  assert(ctxt.balances.length)

  await Promise.all([
    cols.users.insertMany(ctxt.users.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.categories.insertMany(ctxt.categories.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.goldPrices.insertMany(ctxt.goldPrices.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.products.insertMany(ctxt.products.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.balances.insertMany(ctxt.balances.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    /** update seq */
    cols.seq.findOneAndUpdate(
      { model: balancePath },
      { $inc: { seq: ctxt.balances.length } },
      { upsert: true }
    )
  ])
  if (ctxt.medias.length) {
    cols.medias.insertMany(ctxt.medias.map((u) => ({ ...u, __mk: ctxt.migrateKey })))
  }
  return ctxt
}

export async function revertContext(db: Db, migrateKey: string) {
  const cols = getColections(db)

  const res = await Promise.all([
    cols.users.deleteMany({ __mk: migrateKey }),
    cols.categories.deleteMany({ __mk: migrateKey }),
    cols.goldPrices.deleteMany({ __mk: migrateKey }),
    cols.products.deleteMany({ __mk: migrateKey }),
    cols.balances.deleteMany({ __mk: migrateKey }),
    cols.medias.deleteMany({ __mk: migrateKey })
  ])
  return res
}
