import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

let dbFileName: string
if (process.env.NODE_ENV === 'test') {
  dbFileName = 'dbTest.sqlite3'
} else {
  dbFileName = 'db.sqlite3'
}

const dbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath(dbFileName),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
