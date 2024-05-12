import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiRequest, ApiResponse } from '@japa/api-client'

test.group('Players create', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('create a player', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Zinédine',
      lastName: 'Zidane',
      fullName: 'Zinédine Zidane',
      birthDate: '1972-06-23',
      nationality: 'France',
    }

    // When
    const request: ApiRequest = client.post(`/players`)
    request.json(playerData)
    const response: ApiResponse = await request

    // Then
    response.assertStatus(201)
  })
})
