import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Players show', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('get a player by id', async ({ client }) => {
    const response = await client.get(`/players/${1}`)

    response.assertStatus(200)
    response.assertBody({
      firstName: 'Kylian',
      lastName: 'Mbappé',
      fullName: 'Kylian Mbappé',
      birthDate: '1998-12-20',
      nationality: 'France',
    })
  })
})
