import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiResponse } from '@japa/api-client'

test.group('GET /players', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('when there is players in the db it get a list of players', async ({ client }) => {
    const response: ApiResponse = await client.get('/players')

    response.assertStatus(200)
    response.assertBodyContains({
      data: [
        {
          firstName: 'Kylian',
          lastName: 'Mbappé',
          fullName: 'Kylian Mbappé',
          birthDate: '1998-12-20',
          nationality: 'France',
          shirtNumber: 10,
        },
        {
          firstName: 'Antoine',
          lastName: 'Griezmann',
          fullName: 'Antoine Griezmann',
          birthDate: '1991-03-21',
          nationality: 'France',
          shirtNumber: 7,
        },
      ],
    })
  })
})
