import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiRequest, ApiResponse } from '@japa/api-client'

test.group('POST /players', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('when the playload is valid it create a player', async ({ client }) => {
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
  test('when birthDate field is not in the valid format it throw an error', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Zinédine',
      lastName: 'Zidane',
      fullName: 'Zinédine Zidane',
      birthDate: '1972/06/23',
      nationality: 'France',
    }

    // When
    const request: ApiRequest = client.post(`/players`)
    request.json(playerData)
    const response: ApiResponse = await request

    // Then
    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'birthDate',
          message: 'The birthDate field format is invalid',
          rule: 'regex',
        },
      ],
    })
  })

  test('when fullName is not in the valid format it throw an error', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Zinédine',
      lastName: 'Zidane',
      fullName: ['Zinédine', 'Zidane'],
      birthDate: '1972-06-23',
      nationality: 'France',
    }

    // When
    const request: ApiRequest = client.post(`/players`)
    request.json(playerData)
    const response: ApiResponse = await request

    // Then
    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'fullName',
          message: 'The fullName field must be a string',
          rule: 'string',
        },
      ],
    })
  })
})
