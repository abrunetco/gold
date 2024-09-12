import { ObjectOptions, Static, TArray, Type } from '@sinclair/typebox'

export enum Mediatypes {
  IMAGE = 'IMAGE',
  UNKNOWN = 'UNKNOWN'
}

type MediatypesMarkup = { label: string }
type MediatypesMarkupMap = Record<Mediatypes, MediatypesMarkup>

export const MEDIATYPE_MAP: MediatypesMarkupMap = {
  IMAGE: { label: 'تصویر' },
  UNKNOWN: { label: 'نامشخص' }
} as const

type MediatypesByExtentionMap = Record<string, Mediatypes>

export const MEDIATYPE_BY_EXTENTION_MAP: MediatypesByExtentionMap = {
  png: Mediatypes.IMAGE,
  jpg: Mediatypes.IMAGE,
  jpeg: Mediatypes.IMAGE,
  btm: Mediatypes.IMAGE,
  webp: Mediatypes.IMAGE
} as const

export const mediaTypeSchema = Type.Unsafe<Mediatypes>({
  type: 'string',
  enum: Object.keys(MEDIATYPE_MAP),
  enumNames: Object.values(MEDIATYPE_MAP).map((item) => item.label),
  title: 'نوع فایل'
})

const baseMediaSchema = Type.Object({
  path: Type.String()
})

export const anyMediaSchema = Type.Union(
  [
    /** external:
     *  external link to sourse for demo porposes only
     */
    Type.Object({
      id: Type.String(),
      type: mediaTypeSchema,
      external: baseMediaSchema
    }),
    /** local
     *  NOT uploaded and NOT processed
     */
    Type.Object({
      id: Type.String(),
      type: mediaTypeSchema,
      local: Type.Composite(
        [
          Type.Object({
            assemblyId: Type.String(),
            groupId: Type.String(),
            userId: Type.String(),
            fileName: Type.String(),
            preview: Type.Optional(Type.String())
          })
        ],
        { additionalProperties: false }
      )
    }),
    /** transloadit
     *  uploaded and NOT processed
     */
    Type.Object({
      id: Type.String(),
      type: mediaTypeSchema,
      transloadit: Type.Composite(
        [
          baseMediaSchema,
          Type.Object({
            assemblyId: Type.String(),
            extension: Type.String(),
            preview: Type.Optional(Type.String())
          })
        ],
        { additionalProperties: false }
      )
    }),
    /** s3
     *  uploaded and processed
     */
    Type.Object({
      id: Type.String(),
      type: mediaTypeSchema,
      ik: Type.Composite(
        [
          baseMediaSchema,
          Type.Object(
            {
              name: Type.String({ title: 'Name' }),
              url: Type.String({ title: 'Url' }),
              thumbnailUrl: Type.String({ title: 'ThumbnailUrl' }),
              size: Type.Optional(Type.Number({ title: 'Size' })),
              height: Type.Optional(Type.Number({ title: 'Height' })),
              width: Type.Optional(Type.Number({ title: 'Width' })),
              extension: Type.String()
            },
            { $schema: 'media', additionalProperties: false }
          )
        ],
        { additionalProperties: false }
      )
    })
  ],
  { title: 'رسانه' }
)

export type TAnyMedia = typeof anyMediaSchema
export type AnyMedia = Static<TAnyMedia>

export function AnyMediaSchema(type: 'single' | 'multi', options?: ObjectOptions): TArray<TAnyMedia> {
  return Type.Array(anyMediaSchema, { ...options, 'ui:widget': type + '-media' })
}
