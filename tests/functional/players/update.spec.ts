import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiRequest, ApiResponse } from '@japa/api-client'

test.group('PUT /players/:id', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('when the playload is valid it update a player', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: 'Antoine Griezmann',
      birthDate: '1991-03-21',
      nationality: 'Spain',
      shirtNumber: 7,
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
      shirtNumber: 7,
    })
  })

  test('when birthDate field is not in the valid format it throw an error', async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: 'Antoine Griezmann',
      birthDate: '1991/03/21',
      nationality: 'Spain',
      shirtNumber: 7,
    }

    // When
    const request: ApiRequest = client.put(`/players/${2}`)
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
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: true,
      birthDate: '1991-03-21',
      nationality: 'Spain',
      shirtNumber: 7,
    }

    // When
    const request: ApiRequest = client.put(`/players/${2}`)
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

  test("when id doesn't exist it throw an error", async ({ client }) => {
    // Given
    const playerData = {
      firstName: 'Antoine',
      lastName: 'Griezmann',
      fullName: 'Antoine Griezmann',
      birthDate: '1991-03-21',
      nationality: 'Spain',
    }

    // When
    const request: ApiRequest = client.put(`/players/${3}`)
    request.json(playerData)
    const response: ApiResponse = await request

    // Then
    response.assertStatus(404)
  })
})
