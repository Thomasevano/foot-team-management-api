import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('players', (table) => {
      table.integer('shirt_number')
    })
  }

  async down() {
    this.schema.alterTable('players', (table) => {
      table.dropColumn('shirt_number')
    })
  }
}
