import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Player from '#models/player'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test']

  async run() {
    const uniqueKey = 'fullName'

    await Player.updateOrCreateMany(uniqueKey, [
      {
        firstName: 'Kylian',
        lastName: 'Mbappé',
        fullName: 'Kylian Mbappé',
        shirtNumber: 10,
        birthDate: DateTime.fromFormat('1998-12-20', 'yyyy-MM-dd'),
        nationality: 'France',
      },
      {
        firstName: 'Antoine',
        lastName: 'Griezmann',
        fullName: 'Antoine Griezmann',
        shirtNumber: 7,
        birthDate: DateTime.fromFormat('1991-03-21', 'yyyy-MM-dd'),
        nationality: 'France',
      },
    ])
  }
}
