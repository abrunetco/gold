// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { BalanceService } from './class'
import { commonSchema } from '../../shared/common'
import { balancePath } from './shared'
import { gendertypeSchema } from '../../shared/fragments/gender-types'
import { AnyMediaSchema } from '../../shared/fragments/media'
import { querySyntax } from '../../shared/query'

// Main data model schema
export const balanceSchema = Type.Composite(
  [
    Type.Object({
      __typename: Type.Literal(balancePath),
      firstName: Type.Optional(Type.String({ title: 'نام' })),
      lastName: Type.Optional(Type.String({ title: 'نام خانوادگی' })),
      avatar: Type.Optional(AnyMediaSchema('single', { title: 'تصویر' })),
      gender: Type.Optional(gendertypeSchema),
      email: Type.String(),
      password: Type.Optional(Type.String()),
      googleId: Type.Optional(Type.String())
    }),
    commonSchema
  ],
  { $id: 'Balance', additionalProperties: false }
)
export type Balance = Static<typeof balanceSchema>
export const balanceValidator = getValidator(balanceSchema, dataValidator)
export const balanceResolver = resolve<Balance, HookContext<BalanceService>>({
  __typename: virtual(async () => balancePath),
  stringified: virtual(async (u) =>
    u.firstName || u.lastName ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)
  )
})

export const balanceExternalResolver = resolve<Balance, HookContext<BalanceService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const balanceDataSchema = Type.Pick(balanceSchema, ['email', 'password', 'googleId'], {
  $id: 'BalanceData'
})
export type BalanceData = Static<typeof balanceDataSchema>
export const balanceDataValidator = getValidator(balanceDataSchema, dataValidator)
export const balanceDataResolver = resolve<Balance, HookContext<BalanceService>>({
  password: passwordHash({ strategy: 'local' })
  // needPwdOnVerify: virtual(async (balance, ctx) => balance.password ? true : undefined),
})

// Schema for updating existing entries
export const balancePatchSchema = Type.Partial(balanceSchema, {
  $id: 'BalancePatch'
})
export type BalancePatch = Static<typeof balancePatchSchema>
export const balancePatchValidator = getValidator(balancePatchSchema, dataValidator)
export const balancePatchResolver = resolve<Balance, HookContext<BalanceService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const balanceQueryProperties = Type.Pick(balanceSchema, ['uid', 'email', 'googleId'])
export const balanceQuerySchema = Type.Composite(
  [
    querySyntax(balanceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
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
