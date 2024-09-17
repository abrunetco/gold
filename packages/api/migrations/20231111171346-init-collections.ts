import { Db } from 'mongodb'
import { userPath, categoryPath, goldPricePath, configPath } from '../src/client'

export const up = async (db: Db) => {
  /** config */
  await db.createCollection(configPath, { capped: true, size: 81920, max: 10 })
  await db.collection(configPath).createIndex({ uid: 1 }, { unique: true })
  /** user */
  await db.collection(userPath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(userPath).createIndex({ email: 1 }, { unique: true })
  await db.collection(userPath).createIndex({ firstName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ lastName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ firstName: 'text', lastName: 'text' })
  /** category */
  await db.collection(categoryPath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(categoryPath).createIndex({ title: 1 }, { collation: { locale: 'fa' } })
  await db.collection(categoryPath).createIndex({ title: 'text' })
  /** goldPrice */
  await db.createCollection(goldPricePath, { capped: true, size: 10485760, max: 10000 })
  await db.collection(goldPricePath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(goldPricePath).createIndex({ createdAt: 1 })
}

export const down = async (db: Db) => {
  await db.dropCollection(configPath)
  await db.dropCollection(userPath)
  await db.dropCollection(categoryPath)
  await db.dropCollection(goldPricePath)
}
