import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Players list', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('get a list of players', async ({ client }) => {
    const response = await client.get('/players')

    response.assertStatus(200)
    response.assertBodyContains({
      data: [
        {
          firstName: 'Kylian',
          lastName: 'Mbappé',
          fullName: 'Kylian Mbappé',
          birthDate: '1998-12-20',
          nationality: 'France',
        },
        {
          firstName: 'Antoine',
          lastName: 'Griezmann',
          fullName: 'Antoine Griezmann',
          birthDate: '1991-03-21',
          nationality: 'France',
        },
      ],
    })
  })
})
