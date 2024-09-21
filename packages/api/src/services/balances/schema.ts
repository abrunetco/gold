// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import { GeneralError } from '@feathersjs/errors'
import { invoicePath, userPath } from '../../client'
import type { HookContext } from '../../declarations'
import { commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { RelationSchema } from '../../shared/relation'
import { dataValidator, queryValidator } from '../../validators'
import type { BalanceService } from './class'
import { balancePath } from './shared'
const Formatter = Intl.NumberFormat('en', {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false
})
// Main data model schema
export const balanceSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(balancePath),
      number: Type.Readonly(Type.Number()),
      user: RelationSchema(userPath),
      userLabel: Type.Readonly(Type.String()),
      value: Type.Number(),
      src: Type.Union([
        Type.Object({
          invoice: RelationSchema(invoicePath)
        })
      ])
    }),
    commonSchema
  ],
  { $id: 'Balance', additionalProperties: false }
)
export type Balance = Static<typeof balanceSchema>
export const balanceValidator = getValidator(balanceSchema, dataValidator)
export const balanceResolver = resolve<Balance, HookContext<BalanceService>>({
  _typename: virtual(async () => balancePath),
  stringified: virtual(async (u) => `BLN-${Formatter.format(u.number + 1000)}`)
})

export const balanceExternalResolver = resolve<Balance, HookContext<BalanceService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const balanceDataSchema = Type.Pick(balanceSchema, ['number', 'user', 'value', 'src'], {
  $id: 'BalanceData'
})
export type BalanceData = Static<typeof balanceDataSchema>
export const balanceDataValidator = getValidator(balanceDataSchema, dataValidator)
export const balanceDataResolver = resolve<Balance, HookContext<BalanceService>>({
  number: virtual(async (_, context) => {
    const SeqModel = await context.app.get('mongodbClient').then((db) => db.collection('_seq'))
    const doc = await SeqModel.findOneAndUpdate(
      { model: balancePath },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    )
    if (!doc) throw new GeneralError(`can't set seq for: ${balancePath}!`)
    return +doc.seg
  })
})

// Schema for updating existing entries
export const balancePatchSchema = Type.Partial(balanceSchema, {
  $id: 'BalancePatch'
})
export type BalancePatch = Static<typeof balancePatchSchema>
export const balancePatchValidator = getValidator(balancePatchSchema, dataValidator)
export const balancePatchResolver = resolve<Balance, HookContext<BalanceService>>({})

// Schema for allowed query properties
export const balanceQueryProperties = Type.Pick(balanceSchema, ['uid', 'number', 'number', 'value', 'user'])
export const balanceQuerySchema = Type.Composite(
  [
    querySyntax(balanceQueryProperties),
    // Add additional query properties here
    Type.Object(
      {
        net: Type.Optional(Type.Literal(true))
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
)

export type BalanceQuery = Static<typeof balanceQuerySchema>
export const balanceQueryValidator = getValidator(balanceQuerySchema, queryValidator)
export const balanceQueryResolver = resolve<BalanceQuery, HookContext<BalanceService>>({
  // If there is a balance (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, balance, context) => {
  //   if (context.params.balance) {
  //     return context.params.balance._id;
  //   }
  //   return value;
  // },
})
