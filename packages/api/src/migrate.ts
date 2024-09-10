import config from 'config'
import * as migrate from 'migrate-mongo'

export const mc = {
  mongodb: {
    // @ts-ignore
    url: config.mongodb
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".ts",
  useFileHash: true,
  moduleSystem: 'esm',
};

export async function mongoMigrate(cmd?: 'status' | 'up' | 'down' | 'create' | 'restart-db', arg?: string) {
  migrate.config.set(mc)
  const { db, client } = await migrate.database.connect();
  if (cmd === 'create') {
    await migrate.create(arg ?? '')
  } else if (cmd === 'restart-db') {
    await db.dropDatabase()
    await migrate.up(db, client)
  } else if (cmd === 'up') {
    await migrate.up(db, client)
  } else if (cmd === 'down') {
    await migrate.down(db, client)
  }
  const status = await migrate.status(db)

  if (cmd === 'status') {
    console.table(status)
  }
  return status
}

if (require.main === module) {
  ;(async () => {
    const rootIndex = process.argv.findIndex(a => a === __filename) + 1
    const argv = process.argv.slice(rootIndex)
    await mongoMigrate(argv[0] as any, argv[1] as any)
    process.exit(0)
  })()
}