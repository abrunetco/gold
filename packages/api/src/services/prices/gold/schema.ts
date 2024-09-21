// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'
import type { HookContext } from '../../../declarations'
import { commonSchema } from '../../../shared/common'
import { querySyntax } from '../../../shared/query'
import { dataValidator, queryValidator } from '../../../validators'
import type { GoldPriceService } from './class'
import { goldPricePath } from './shared'
import moment from 'moment-jalaali'

const Formatter = Intl.NumberFormat('fa-IR', {
  currency: 'IRR',
  style: 'currency',
  maximumFractionDigits: 0,
  roundingIncrement: 5000
})

// Main data model schema
export const goldPriceSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(goldPricePath),
      v: Type.Number(),
      jDate: Type.Object({
        y: Type.String(),
        m: Type.String(),
        w: Type.String(),
        d: Type.String(),
        hh: Type.String(),
        mm: Type.String()
      }),
      candle: Type.Optional(
        Type.Object({
          o: Type.Number(),
          c: Type.Number(),
          h: Type.Number(),
          l: Type.Number()
        })
      )
    }),
    commonSchema
  ],
  { $id: 'GoldPrice', additionalProperties: false }
)
export type GoldPrice = Static<typeof goldPriceSchema>
export const goldPriceValidator = getValidator(goldPriceSchema, dataValidator)
export const goldPriceResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  _typename: virtual(async () => goldPricePath),
  stringified: virtual(async (u) => Formatter.format(u.v))
})

export const goldPriceExternalResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const goldPriceDataSchema = Type.Pick(goldPriceSchema, ['v'], {
  $id: 'GoldPriceData'
})
export type GoldPriceData = Static<typeof goldPriceDataSchema>
export const goldPriceDataValidator = getValidator(goldPriceDataSchema, dataValidator)
export const goldPriceDataResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  // needPwdOnVerify: virtual(async (goldPrice, ctx) => goldPrice.password ? true : undefined),
  jDate: virtual(async () => {
    const mj = moment().add(3.5, 'h')
    return {
      y: mj.jYear().toString(),
      m: mj.jMonth().toString(),
      w: mj.jWeek().toString(),
      d: mj.jDate().toString(),
      hh: mj.hour().toString(),
      mm: mj.minute().toString()
    }
  })
})

// Schema for updating existing entries
export const goldPricePatchSchema = Type.Partial(goldPriceSchema, {
  $id: 'GoldPricePatch'
})
export type GoldPricePatch = Static<typeof goldPricePatchSchema>
export const goldPricePatchValidator = getValidator(goldPricePatchSchema, dataValidator)
export const goldPricePatchResolver = resolve<GoldPrice, HookContext<GoldPriceService>>({
  // keep it empty
})

export enum CandleTypes {
  m = 'm',
  w = 'w',
  d = 'd',
  hh = 'hh',
  mm = 'mm'
}

export const candleSchema = Type.Unsafe<CandleTypes>({
  type: 'string',
  enum: [...Object.keys(CandleTypes), 'default'],
  title: 'نقش'
})

// Schema for allowed query properties
export const goldPriceQueryProperties = Type.Pick(goldPriceSchema, ['createdAt'])
export const goldPriceQuerySchema = Type.Composite(
  [
    querySyntax(goldPriceQueryProperties),
    // Add additional query properties here
    Type.Object(
      {
        candle: Type.Optional(candleSchema)
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
)

export type GoldPriceQuery = Static<typeof goldPriceQuerySchema>
export const goldPriceQueryValidator = getValidator(goldPriceQuerySchema, queryValidator)
export const goldPriceQueryResolver = resolve<GoldPriceQuery, HookContext<GoldPriceService>>({
  // keep it empty
})
