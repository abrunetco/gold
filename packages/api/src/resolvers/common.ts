// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type } from '@feathersjs/typebox'
import { uid } from 'uid'
import type { HookContext } from '../declarations'
import { Common, commonSchema, commonSharedKeys } from '../shared/common'

export const commonDataResolverWithoutUID = resolve<Common, HookContext>({
  createdAt: async () => new Date().getTime(),
  createdBy: async (_value, _data, context) => {
    const [, params] = context.arguments

    return params?.user ? params.user.uid : undefined
  }
})
export const commonDataResolver = resolve<Common, HookContext>({
  uid: async (u) => u ?? uid(8),
  createdAt: async () => new Date().getTime(),
  createdBy: async (_value, _data, context) => {
    const [, params] = context.arguments

    return params?.user ? params.user.uid : undefined
  }
})

export const commonPatchResolver = resolve<Common, HookContext>({
  updatedAt: async () => new Date().getTime(),
  createdBy: async () => undefined
})

export const commonQueryProperties = Type.Pick(commonSchema, commonSharedKeys)
export type TCommonQuery = typeof commonQueryProperties
// export const commonQuerySchema = Type.Composite(
//   [
//     querySyntax(commonSchema),
//   ],
//   { additionalProperties: false }
// )
// export type CommonQuery = Static<typeof commonQuerySchema>

type IdQuery = Common['uid']

export async function batchIdResolver(id: IdQuery): Promise<IdQuery> {
  // if (id && typeof id !== "string" && "$in" in id) {
  // id.$in = (id.$in?.map(
  //   id => typeof id === 'string' ? new MDBObjectId(id) : id
  // ) ?? []) as unknown as string[]
  // return id
  // }

  return id
}
