import { Static, Type } from '@feathersjs/typebox'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mediaObjectSchema = Type.Object(
  {
    fileId: Type.String({ title: 'FiledID' }),
    filePath: Type.String({ title: 'FilePath' }),
    fileType: Type.Optional(Type.String({ title: 'FileType' })),
    height: Type.Optional(Type.Number({ title: 'Height' })),
    name: Type.String({ title: 'Name' }),
    size: Type.Optional(Type.Number({ title: 'Size' })),
    thumbnailUrl: Type.String({ title: 'ThumbnailUrl' }),
    url: Type.String({ title: 'Url' }),
    width: Type.Optional(Type.Number({ title: 'Width' }))
  },
  { $schema: 'media', additionalProperties: false }
)

export type MediaObject = Static<typeof mediaObjectSchema>
