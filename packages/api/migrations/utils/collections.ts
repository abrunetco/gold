import assert from "assert";
import { Db } from "mongodb";
import { uid } from "uid";
import { User, userPath } from "../../src/services/users/shared";
import { Common } from "../../src/shared/common";

export const generatorUID = "e139584c"
export default function getColections(db: Db) {
  return {
    users: db.collection<User>(userPath)
  }
}

export function commons(): Common {
  return {
    // _id: new ObjectId(),
    createdAt: (new Date()).getTime(),
    uid: uid(8),
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
  verifyExpires: null,
} as const

export interface TestMeta {
  meta?: any
}

export interface DataContext {
  users: Array<User & TestMeta>
}

export const makeContext = (): DataContext => ({
  users: []
})

export async function applyContext(db: Db, ctxt: DataContext) {
  const cols = getColections(db)

  assert(ctxt.users.length)

  await Promise.all([
    cols.users.insertMany(ctxt.users),
  ])
  return ctxt
}