import { app } from './app'
import { logger } from './logger'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => {
  console.log(reason)

  logger.error('Unhandled Rejection %O', reason)

  console.log(JSON.stringify({ reason }, null, 2))
})

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
