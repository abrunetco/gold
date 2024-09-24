// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'
import { taskValidator } from '../../validators'

export const ONBOARD_MEDIA_TASK = 'ONBOARD_MEDIA_TASK'

export const dataSchema = Type.Object(
  {
    media: Type.String()
  },
  { additionalProperties: false }
)
export type TaskData = Static<typeof dataSchema>
export const onboardMediaDataValidator = getValidator(dataSchema, taskValidator)

export const resultSchema = Type.Object(
  {
    media: Type.String()
  },
  { additionalProperties: false }
)
export type TaskResult = Static<typeof resultSchema>
