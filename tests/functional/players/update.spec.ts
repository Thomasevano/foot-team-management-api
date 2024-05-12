import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiRequest, ApiResponse } from '@japa/api-client'

test.group('Players update', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('update a player', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: 'Antoine Griezmann',
      birthDate: '1991-03-21',
      nationality: 'Spain',
    }

    // When
    const request: ApiRequest = client.put(`/players/${2}`)
    request.json(playerData)
    const response: ApiResponse = await request

    // Then
    response.assertStatus(200)
    response.assertBody({
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: 'Antoine Griezmann',
      birthDate: '1991-03-21',
      nationality: 'Spain',
    })
  })
})
