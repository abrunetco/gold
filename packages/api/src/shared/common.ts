// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { Static } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"
import { MongoDateSchema } from "./relation"

// Main data model schema
export const commonSharedKeys = ["uid", "createdBy", "createdAt", "updatedAt", "deletedAt", "readonly", "stringified"] as const

export const commonSchema = Type.Object(
  {
    uid: Type.String({ title: 'شناسه' }),
    /**
     * NOTE: createdBy cannot be a relation!
     * to avoid circular reference
     */
    // createdBy: Type.Optional(RelationSchema(CORE_KEYS.users, { title: 'ثبت توسط' })),
    createdBy: Type.Optional(Type.String({ title: 'ثبت توسط' })),
    createdAt: MongoDateSchema({ default: () => (new Date()).getTime(), title: 'تاریخ ثبت' }),
    updatedAt: Type.Optional(MongoDateSchema({ title: 'تاریخ ویرایش' })),
    deletedAt: Type.Optional(MongoDateSchema({ title: 'تاریخ حذف' })),
    readonly: Type.Boolean({ default: false, title: 'قفل شده' }),
    stringified: Type.Optional(Type.String())
  },
  { $id: "Common", additionalProperties: true }
)
export type TCommon = typeof commonSchema
export type Common = Static<TCommon>

export const commonQueryProperties = Type.Omit(commonSchema, ["stringified"])
export type TCommonQueryProperties = typeof commonQueryProperties
export type CommonQueryProperties = Static<TCommonQueryProperties>


export function isCommon<T extends Common>(data?: T): data is T & { __typename: string } {
  return !!data && '__typename' in data
}
