// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { dataValidator, queryValidator } from '../../validators'
import type { ConfigService } from './class'
import { configPath } from './shared'

const AsConstSchema = { additionalProperties: false } as const

const configMapSchema = Type.Object({
  siteSeoConfig: Type.Object(
    {
      title: Type.String(),
      description: Type.String()
    },
    AsConstSchema
  ),
  goldPriceConfig: Type.Object(
    {
      mode: Type.Unsafe<'fixed' | 'channel' | 'percent'>({ type: 'string' }),
      fixed: Type.Object({ value: Type.Number() }, AsConstSchema),
      percent: Type.Object({ value: Type.Number() }, AsConstSchema)
    },
    AsConstSchema
  )
})

// Main data model schema
export const configSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(configPath)
    }),
    configMapSchema,
    commonSchema
  ],
  { $id: 'Config', additionalProperties: false }
)
export type Config = Static<typeof configSchema>
export const configValidator = getValidator(configSchema, dataValidator)
export const configResolver = resolve<Config, HookContext<ConfigService>>({
  _typename: virtual(async () => configPath),
  stringified: virtual(async () => String(configPath))
})

export const configExternalResolver = resolve<Config, HookContext<ConfigService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const configDataSchema = Type.Pick(configSchema, ['uid'], {
  $id: 'ConfigData'
})
export type ConfigData = Static<typeof configDataSchema>
// export const configDataValidator = getValidator(configDataSchema, dataValidator)
// export const configDataResolver = resolve<Config, HookContext<ConfigService>>({
//   // needPwdOnVerify: virtual(async (config, ctx) => config.password ? true : undefined),
// })

// Schema for updating existing entries
export const configPatchSchema = Type.Partial(configSchema, {
  $id: 'ConfigPatch'
})
export type ConfigPatch = Static<typeof configPatchSchema>
export const configPatchValidator = getValidator(configPatchSchema, dataValidator)
export const configPatchResolver = resolve<Config, HookContext<ConfigService>>({})

// Schema for allowed query properties
export const configQueryProperties = Type.Pick(configSchema, ['uid'])
export const configQuerySchema = Type.Composite(
  [
    querySyntax(configQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type ConfigQuery = Static<typeof configQuerySchema>
export const configQueryValidator = getValidator(configQuerySchema, queryValidator)
export const configQueryResolver = resolve<ConfigQuery, HookContext<ConfigService>>({})
