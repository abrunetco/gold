// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Config, ConfigData, ConfigPatch, ConfigQuery, ConfigService } from './class'

export type { Config, ConfigData, ConfigPatch, ConfigQuery }

export type ConfigClientService = Pick<ConfigService<Params<ConfigQuery>>, (typeof configMethods)[number]>

export const configPath = 'configs' as const

export const configMethods: Array<keyof ConfigService> = ['find', 'get', 'create', 'patch', 'remove']

export const configClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(configPath, connection.service(configPath), {
    methods: configMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [configPath]: ConfigClientService
  }
}
