import { Db, MongoClient } from 'mongodb';
import { userPath } from "../src/services/users/shared";

export const up = async (db: Db, client: MongoClient) => {
  await db.collection(userPath).createIndex({ uid: 1 })
  await db.collection(userPath).createIndex({ email: 1 }, { unique: true })
  await db.collection(userPath).createIndex({ firstName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ lastName: 1 }, { collation: { locale: 'fa' } })
  await db.collection(userPath).createIndex({ firstName: "text", lastName: "text" })
  /** classroom */
}

export const down = async (db: Db, client: MongoClient) => {
  await db.dropCollection(userPath)
}
