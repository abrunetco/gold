import { Static, Type } from '@feathersjs/typebox'
import { resolve } from '@feathersjs/schema'
import { HookContext } from '../declarations'
import { TQuerySyntax } from '../shared/query'

export const textSearchSchema = Type.Object(
  {
    q: Type.String()
    // $text: Type.Object({ $search: Type.String() })
  },
  { additionalProperties: false }
)
export type TTextSearch = typeof textSearchSchema
export type TextSearch = Static<TTextSearch>

export const textSearchQuerySchema = Type.Partial(Type.Pick(textSearchSchema, []))
// export type TextSearchQuery = Static<typeof textSearchQuerySchema>

export const templatesQueryResolver = resolve<TQuerySyntax<TTextSearch>, HookContext>({
  // uid: async (_v, query, ctx, status) => {
  //   if (query.q) {
  //     const q = query.q.split(' ').join('|')
  //     return { $regex: q }
  //   } else if (Array.isArray(_v)) {
  //     return { $in: _v }
  //   } else if (_v) {
  //     return _v
  //   }
  // },
  q: async () => undefined
})
