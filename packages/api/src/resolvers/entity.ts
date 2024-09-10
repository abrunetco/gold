// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { Params } from "@feathersjs/feathers"
import { resolve, virtual } from "@feathersjs/schema"
import { HookContext } from "@sms/api/src/declarations"
import { EntityCommon } from "@sms/defs/src/entities/common"
import { extendQuery } from "./query"

export const entityCommonDataResolver = resolve<EntityCommon, HookContext>({
  group: virtual(async (g, ctxt) => {
    const param: Params = ctxt.arguments.slice().pop()
    if (!param.group) throw 'group is not defined'
    return param.group.uid
  }),
  year: virtual(async (g, ctxt) => {
    const param: Params = ctxt.arguments.slice().pop()
    if (!param.year) throw 'year is not defined'
    return param.year
  })
})

export const entityCommonQueryResolver = resolve<EntityCommon, HookContext>({}, {
  converter: async (query, ctxt) => {
    const params: Params = ctxt.arguments.slice().pop()
    const qroupQuery: any = {
      group: params.group?.uid ?? '-',
      year: params.year ?? '-'
    }
    // return extendQuery(query, qroupQuery)
    return query
  }
})
