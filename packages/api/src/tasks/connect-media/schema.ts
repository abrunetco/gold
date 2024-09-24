// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'
import { EntityName } from '../../client'
import { taskValidator } from '../../validators'

export const CONNECT_MEDIA_TASK = 'CONNECT_MEDIA_TASK'

export const dataSchema = Type.Object(
  {
    service: Type.String(),
    uid: Type.String(),
    fields: Type.Array(Type.String())
  },
  { additionalProperties: false }
)
export type TaskData = {
  service: EntityName
  uid: string
  fields: string[]
}
export const onboardMediaDataValidator = getValidator(dataSchema, taskValidator)

export const resultSchema = Type.Object(
  {
    effectedMedia: Type.Array(Type.String())
  },
  { additionalProperties: false }
)
export type TaskResult = Static<typeof resultSchema>
