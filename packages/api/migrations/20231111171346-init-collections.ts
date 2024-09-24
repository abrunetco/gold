import { Db } from 'mongodb'
import {
  userPath,
  categoryPath,
  goldPricePath,
  configPath,
  balancePath,
  productPath,
  mediaPath
} from '../src/client'

export const up = async (db: Db) => {
  /** config */
  await db.createCollection(configPath, { capped: true, size: 81920, max: 10 })
  await db.collection(configPath).createIndex({ uid: 1 }, { unique: true })
  /** seq */
  await db.createCollection('_seq', { capped: true, size: 81920, max: 10 })
  await db.collection('_seq').createIndex({ model: 1 }, { unique: true })
  /** user */
  await db.collection(userPath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(userPath).createIndex({ email: 1 }, { unique: true })
  await db.collection(userPath).createIndex({ firstName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ lastName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ firstName: 'text', lastName: 'text' })
  /** categories */
  await db.collection(categoryPath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(categoryPath).createIndex({ title: 1 }, { collation: { locale: 'fa' } })
  await db.collection(categoryPath).createIndex({ title: 'text' })
  /** products */
  await db.collection(productPath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(productPath).createIndex({ category: 1 })
  await db.collection(productPath).createIndex({ title: 1 }, { collation: { locale: 'fa' } })
  await db.collection(productPath).createIndex({ title: 'text' })
  /** goldPrice */
  await db.createCollection(goldPricePath, { capped: true, size: 10485760, max: 10000 })
  await db.collection(goldPricePath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(goldPricePath).createIndex({ createdAt: 1 })
  /** balances */
  await db.collection(balancePath).createIndex({ uid: 1 }, { unique: true })
  await db.collection(balancePath).createIndex({ number: 1 }, { unique: true })
  await db.collection(balancePath).createIndex({ user: 1 })
  await db.collection(balancePath).createIndex({ createdAt: 1 })
  await db.collection('_seq').insertOne({ model: balancePath, seq: 0 })
  /** medias */
  await db.collection(mediaPath).createIndex({ uid: 1 }, { unique: true })
}

export const down = async (db: Db) => {
  await db.dropCollection(configPath)
  await db.dropCollection('_seq')
  await db.dropCollection(userPath)
  await db.dropCollection(categoryPath)
  await db.dropCollection(productPath)
  await db.dropCollection(goldPricePath)
  await db.dropCollection(balancePath)
  await db.dropCollection(mediaPath)
}
