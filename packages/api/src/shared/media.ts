import { Static, ObjectOptions, Type } from "@feathersjs/typebox"


const mediaObjectSchema = Type.Object({
  fileId: Type.String({ title: "FiledID" }),
  filePath: Type.String({ title: "FilePath" }),
  fileType: Type.Optional(Type.String({ title: "FileType" })),
  height: Type.Optional(Type.Number({ title: "Height" })),
  name: Type.String({ title: "Name" }),
  size: Type.Optional(Type.Number({ title: "Size" })),
  thumbnailUrl: Type.String({ title: "ThumbnailUrl" }),
  url: Type.String({ title: "Url" }),
  width: Type.Optional(Type.Number({ title: "Width" })),
}, { $schema: "media", additionalProperties: false })

export type MediaObject = Static<typeof mediaObjectSchema>