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
import type { MediaService } from './class'
import { mediaPath } from './shared'
const Formatter = Intl.NumberFormat('en', {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false
})
// Main data model schema
export const mediaSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(mediaPath),
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
  { $id: 'Media', additionalProperties: false }
)
export type Media = Static<typeof mediaSchema>
export const mediaValidator = getValidator(mediaSchema, dataValidator)
export const mediaResolver = resolve<Media, HookContext<MediaService>>({
  _typename: virtual(async () => mediaPath),
  stringified: virtual(async (u) => `BLN-${Formatter.format(u.number + 1000)}`)
})

export const mediaExternalResolver = resolve<Media, HookContext<MediaService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const mediaDataSchema = Type.Pick(mediaSchema, ['number', 'user', 'value', 'src'], {
  $id: 'MediaData'
})
export type MediaData = Static<typeof mediaDataSchema>
export const mediaDataValidator = getValidator(mediaDataSchema, dataValidator)
export const mediaDataResolver = resolve<Media, HookContext<MediaService>>({
  number: virtual(async (_, context) => {
    const SeqModel = await context.app.get('mongodbClient').then((db) => db.collection('_seq'))
    const doc = await SeqModel.findOneAndUpdate(
      { model: mediaPath },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    )
    if (!doc) throw new GeneralError(`can't set seq for: ${mediaPath}!`)
    return +doc.seg
  })
})

// Schema for updating existing entries
export const mediaPatchSchema = Type.Partial(mediaSchema, {
  $id: 'MediaPatch'
})
export type MediaPatch = Static<typeof mediaPatchSchema>
export const mediaPatchValidator = getValidator(mediaPatchSchema, dataValidator)
export const mediaPatchResolver = resolve<Media, HookContext<MediaService>>({})

// Schema for allowed query properties
export const mediaQueryProperties = Type.Pick(mediaSchema, ['uid', 'number', 'number', 'value', 'user'])
export const mediaQuerySchema = Type.Composite(
  [
    querySyntax(mediaQueryProperties),
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

export type MediaQuery = Static<typeof mediaQuerySchema>
export const mediaQueryValidator = getValidator(mediaQuerySchema, queryValidator)
export const mediaQueryResolver = resolve<MediaQuery, HookContext<MediaService>>({
  // If there is a media (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, media, context) => {
  //   if (context.params.media) {
  //     return context.params.media._id;
  //   }
  //   return value;
  // },
})
