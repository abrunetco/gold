// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox'

export const CRONS_TASK = 'CRONS_TASK'

export const dataSchema = Type.Object(
  {
    task: Type.String()
  },
  { additionalProperties: false }
)
export type TaskData = Static<typeof dataSchema>

export const resultSchema = Type.Object({}, { additionalProperties: false })
export type TaskResult = Static<typeof resultSchema>
