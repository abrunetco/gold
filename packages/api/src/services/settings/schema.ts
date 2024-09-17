// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { dataValidator, queryValidator } from '../../validators'
import type { SettingService } from './class'
import { settingPath } from './shared'

// Main data model schema
export const settingSchema = Type.Composite(
  [
    Type.Object({
      __typename: Type.Literal(settingPath)
    }),
    commonSchema
  ],
  { $id: 'Setting', additionalProperties: false }
)
export type Setting = Static<typeof settingSchema>
export const settingValidator = getValidator(settingSchema, dataValidator)
export const settingResolver = resolve<Setting, HookContext<SettingService>>({
  __typename: virtual(async () => settingPath),
  stringified: virtual(async (u) => u.uid)
})

export const settingExternalResolver = resolve<Setting, HookContext<SettingService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const settingDataSchema = Type.Pick(settingSchema, ['uid'], {
  $id: 'SettingData'
})
export type SettingData = Static<typeof settingDataSchema>
export const settingDataValidator = getValidator(settingDataSchema, dataValidator)
export const settingDataResolver = resolve<Setting, HookContext<SettingService>>({
  // needPwdOnVerify: virtual(async (setting, ctx) => setting.password ? true : undefined),
})

// Schema for updating existing entries
export const settingPatchSchema = Type.Partial(settingSchema, {
  $id: 'SettingPatch'
})
export type SettingPatch = Static<typeof settingPatchSchema>
export const settingPatchValidator = getValidator(settingPatchSchema, dataValidator)
export const settingPatchResolver = resolve<Setting, HookContext<SettingService>>({})

// Schema for allowed query properties
export const settingQueryProperties = Type.Pick(settingSchema, ['uid'])
export const settingQuerySchema = Type.Composite(
  [
    querySyntax(settingQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type SettingQuery = Static<typeof settingQuerySchema>
export const settingQueryValidator = getValidator(settingQuerySchema, queryValidator)
export const settingQueryResolver = resolve<SettingQuery, HookContext<SettingService>>({})
