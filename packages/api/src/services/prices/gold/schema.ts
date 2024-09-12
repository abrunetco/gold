// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { GoldPriceService } from './class'
import { commonSchema } from '../../../shared/common'
import { goldPricePath } from './shared'
import { gendertypeSchema } from '../../../shared/fragments/gender-types'
import { AnyMediaSchema } from '../../../shared/fragments/media'
import { querySyntax } from '../../../shared/query'

// Main data model schema
export const goldPriceSchema = Type.Composite(
  [
    Type.Object({
      __typename: Type.Literal(goldPricePath),
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
  { $id: 'GoldPrice', additionalProperties: false }
)
export type GoldPrice = Static<typeof goldPriceSchema>
export const goldPriceValidator = getValidator(goldPriceSchema, dataValidator)
export const goldPriceResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  __typename: virtual(async () => goldPricePath),
  stringified: virtual(async (u) =>
    u.firstName || u.lastName ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)
  )
})

export const goldPriceExternalResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const goldPriceDataSchema = Type.Pick(goldPriceSchema, ['email', 'password', 'googleId'], {
  $id: 'GoldPriceData'
})
export type GoldPriceData = Static<typeof goldPriceDataSchema>
export const goldPriceDataValidator = getValidator(goldPriceDataSchema, dataValidator)
export const goldPriceDataResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  password: passwordHash({ strategy: 'local' })
  // needPwdOnVerify: virtual(async (goldPrice, ctx) => goldPrice.password ? true : undefined),
})

// Schema for updating existing entries
export const goldPricePatchSchema = Type.Partial(goldPriceSchema, {
  $id: 'GoldPricePatch'
})
export type GoldPricePatch = Static<typeof goldPricePatchSchema>
export const goldPricePatchValidator = getValidator(goldPricePatchSchema, dataValidator)
export const goldPricePatchResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const goldPriceQueryProperties = Type.Pick(goldPriceSchema, ['uid', 'email', 'googleId'])
export const goldPriceQuerySchema = Type.Composite(
  [
    querySyntax(goldPriceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type GoldPriceQuery = Static<typeof goldPriceQuerySchema>
export const goldPriceQueryValidator = getValidator(goldPriceQuerySchema, queryValidator)
export const goldPriceQueryResolver = resolve<GoldPriceQuery, HookContext<GoldPriceService>>({
  // If there is a goldPrice (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, goldPrice, context) => {
  //   if (context.params.goldPrice) {
  //     return context.params.goldPrice._id;
  //   }
  //   return value;
  // },
})
