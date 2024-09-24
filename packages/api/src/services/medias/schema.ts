// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { dataValidator, queryValidator } from '../../validators'
import type { MediaService } from './class'
import { mediaPath } from './shared'

export const mediaSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(mediaPath),
      encoding: Type.String(),
      mimetype: Type.String(),
      destination: Type.String(),
      filename: Type.String(),
      path: Type.String(),
      size: Type.Number(),
      height: Type.Number(),
      width: Type.Number(),
      isProtected: Type.Optional(Type.Boolean()),
      ratio: Type.Number(),
      meta: Type.Object({}, { additionalProperties: true }),
      refs: Type.Array(Type.String()),
      unboarded: Type.Optional(Type.String())
    }),
    commonSchema
  ],
  { $id: 'Media', additionalProperties: false }
)
export type Media = Static<typeof mediaSchema>
export const mediaValidator = getValidator(mediaSchema, dataValidator)
export const mediaResolver = resolve<Media, HookContext<MediaService>>({
  _typename: virtual(async () => mediaPath),
  stringified: virtual(async (m) => m.uid)
})

export const mediaExternalResolver = resolve<Media, HookContext<MediaService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const mediaDataSchema = Type.Pick(
  mediaSchema,
  ['encoding', 'mimetype', 'destination', 'filename', 'path', 'size', 'meta', 'isProtected'],
  {
    $id: 'MediaData'
  }
)
export type MediaData = Static<typeof mediaDataSchema>
export const mediaDataValidator = getValidator(mediaDataSchema, dataValidator)
export const mediaDataResolver = resolve<Media, HookContext<MediaService>>({
  uid: async (uid, media) => media.path.replace('/files/', '').replace(/\//g, '-'),
  isProtected: async (isProtected) => isProtected ?? false,
  refs: async () => []
})

// Schema for updating existing entries
export const mediaPatchSchema = Type.Partial(mediaSchema, {
  $id: 'MediaPatch'
})
export type MediaPatch = Static<typeof mediaPatchSchema>
export const mediaPatchValidator = getValidator(mediaPatchSchema, dataValidator)
export const mediaPatchResolver = resolve<Media, HookContext<MediaService>>({})

// Schema for allowed query properties
export const mediaQueryProperties = Type.Pick(mediaSchema, ['uid', 'mimetype', 'filename', 'size'])
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
