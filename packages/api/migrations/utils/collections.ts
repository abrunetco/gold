import assert from 'assert'
import { Db } from 'mongodb'
import { uid } from 'uid'
import { Common } from '../../src/shared/common'
import {
  Category,
  categoryPath,
  Config,
  configPath,
  GoldPrice,
  goldPricePath,
  User,
  userPath
} from '../../src/client'

export const generatorUID = 'e139584c'

export default function getColections(db: Db) {
  return {
    configs: db.collection<Config>(configPath),
    users: db.collection<User>(userPath),
    categories: db.collection<Category>(categoryPath),
    goldPrices: db.collection<GoldPrice>(goldPricePath)
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
}

export const makeContext = (migrateKey: string): DataContext => ({
  migrateKey,
  users: [],
  categories: [],
  goldPrices: []
})

export async function applyContext(db: Db, ctxt: DataContext) {
  const cols = getColections(db)

  assert(ctxt.users.length)
  assert(ctxt.categories.length)
  assert(ctxt.goldPrices.length)

  await Promise.all([
    cols.users.insertMany(ctxt.users.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.categories.insertMany(ctxt.categories.map((u) => ({ ...u, __mk: ctxt.migrateKey }))),
    cols.goldPrices.insertMany(ctxt.goldPrices.map((u) => ({ ...u, __mk: ctxt.migrateKey })))
  ])
  return ctxt
}

export async function revertContext(db: Db, migrateKey: string) {
  const cols = getColections(db)

  const res = await Promise.all([
    cols.users.deleteMany({ __mk: migrateKey }),
    cols.categories.deleteMany({ __mk: migrateKey }),
    cols.goldPrices.deleteMany({ __mk: migrateKey })
  ])
  return res
}
