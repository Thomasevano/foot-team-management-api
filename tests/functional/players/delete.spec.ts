import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiResponse } from '@japa/api-client'

test.group('DELETE /players/:id', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('When id exist it delete a player', async ({ client }) => {
    const response: ApiResponse = await client.delete(`/players/${2}`)
    response.assertStatus(204)
  })

  test("When id doesn't exist it delete a player", async ({ client }) => {
    const response: ApiResponse = await client.delete(`/players/${3}`)
    response.assertStatus(404)
  })
})
