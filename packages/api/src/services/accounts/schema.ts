// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AccountService } from './class'
import { commonSchema } from '../../shared/common'
import { accountPath } from './shared'
import { gendertypeSchema } from '../../shared/fragments/gender-types'
import { AnyMediaSchema } from '../../shared/fragments/media'
import { querySyntax } from '../../shared/query'

// Main data model schema
export const accountSchema = Type.Composite(
  [
    Type.Object({
      __typename: Type.Literal(accountPath),
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
  { $id: 'Account', additionalProperties: false }
)
export type Account = Static<typeof accountSchema>
export const accountValidator = getValidator(accountSchema, dataValidator)
export const accountResolver = resolve<Account, HookContext<AccountService>>({
  __typename: virtual(async () => accountPath),
  stringified: virtual(async (u) =>
    u.firstName || u.lastName ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)
  )
})

export const accountExternalResolver = resolve<Account, HookContext<AccountService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const accountDataSchema = Type.Pick(accountSchema, ['email', 'password', 'googleId'], {
  $id: 'AccountData'
})
export type AccountData = Static<typeof accountDataSchema>
export const accountDataValidator = getValidator(accountDataSchema, dataValidator)
export const accountDataResolver = resolve<Account, HookContext<AccountService>>({
  password: passwordHash({ strategy: 'local' })
  // needPwdOnVerify: virtual(async (account, ctx) => account.password ? true : undefined),
})

// Schema for updating existing entries
export const accountPatchSchema = Type.Partial(accountSchema, {
  $id: 'AccountPatch'
})
export type AccountPatch = Static<typeof accountPatchSchema>
export const accountPatchValidator = getValidator(accountPatchSchema, dataValidator)
export const accountPatchResolver = resolve<Account, HookContext<AccountService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const accountQueryProperties = Type.Pick(accountSchema, ['uid', 'email', 'googleId'])
export const accountQuerySchema = Type.Composite(
  [
    querySyntax(accountQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type AccountQuery = Static<typeof accountQuerySchema>
export const accountQueryValidator = getValidator(accountQuerySchema, queryValidator)
export const accountQueryResolver = resolve<AccountQuery, HookContext<AccountService>>({
  // If there is a account (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, account, context) => {
  //   if (context.params.account) {
  //     return context.params.account._id;
  //   }
  //   return value;
  // },
})
