import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Players delete', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('delete a player', async ({ client }) => {
    const response = await client.delete(`/players/${2}`)
    response.assertStatus(204)
  })
})
