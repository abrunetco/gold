
import { type ClientMixin, createClient, AuthenticationParams } from "@gold/api"
import transport from "./transports/ws.local"
// import { cacheIndexed, getFromCache, rtcUpdateCache } from "./idxdb"

const mixin: ClientMixin = function (service, path, options) {
  // if (path === 'authentication') return
  // for (const event of (options.events ?? [])) {
  //   service.on(event, rtcUpdateCache(event))
  // }
}

const client = createClient(
  transport,
  {
    storage: window.localStorage,
  },
  // mixin
)

export default client

client.hooks({
  around: {
    // all: [cacheIndexed()],
    // get: [getFromCache()]
  }
})


export type AuthenticationResult = AuthenticationParams