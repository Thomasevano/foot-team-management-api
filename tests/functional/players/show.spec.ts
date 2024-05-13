import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiResponse } from '@japa/api-client'

test.group('GET /players/:id', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('when id existe it get a player by id', async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/players/${1}`)

    // Then
    response.assertStatus(200)
    response.assertBody({
      firstName: 'Kylian',
      lastName: 'Mbappé',
      fullName: 'Kylian Mbappé',
      birthDate: '1998-12-20',
      nationality: 'France',
      shirtNumber: 10,
    })
  })
  test("when id doesn't exist it throw an error", async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/players/${3}`)

    // Then
    response.assertStatus(404)
  })
})
