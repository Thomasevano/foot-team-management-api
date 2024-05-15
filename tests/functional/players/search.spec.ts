import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiResponse } from '@japa/api-client'

test.group('GET /player/search', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('When name of the player exist it return players list', async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/player/search?name=kylian`)

    // Then
    response.assertStatus(200)
    response.assertBodyContains([
      {
        firstName: 'Kylian',
        lastName: 'Mbappé',
        fullName: 'Kylian Mbappé',
        birthDate: '1998-12-20',
        nationality: 'France',
        shirtNumber: 10,
      },
    ])
  })
  test('When name of the player contains query string it return players list', async ({
    client,
  }) => {
    // When
    const response: ApiResponse = await client.get(`/player/search?name=an`)

    // Then
    response.assertStatus(200)
    response.assertBodyContains([
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
        nationality: 'France',
        birthDate: '1991-03-21',
        shirtNumber: 7,
      },
    ])
  })
  test("When name doesn't it return an empty array", async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/player/search?name=Cristiano`)

    // Then
    response.assertStatus(200)
    response.assertBody([])
  })
  test('When shirtNumber exist it return players list', async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/player/search?shirtName=${10}`)

    // Then
    response.assertStatus(200)
    response.assertBodyContains([
      {
        firstName: 'Kylian',
        lastName: 'Mbappé',
        fullName: 'Kylian Mbappé',
        birthDate: '1998-12-20',
        nationality: 'France',
        shirtNumber: 10,
      },
    ])
  })
  test("When shirtNumber doesn't exist it return an empty array", async ({ client }) => {
    // When
    const response: ApiResponse = await client.get(`/player/search?shirtName=${1}`)

    // Then
    response.assertStatus(200)
    response.assertBodyContains([])
  })
})
