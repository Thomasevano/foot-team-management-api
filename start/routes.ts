/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PlayersController = () => import('#controllers/players_controller')
import Player from '#models/player'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
// import { middleware } from './kernel.js'

// router
//   .get('/', async ({ auth }) => {
//     return auth.getUserOrFail()
//   })
//   .use(middleware.auth())

router.resource('players', PlayersController).apiOnly()

/**
 * Get player by name or shirt number
 */
router.get('/player/search', async ({ params, response, request }: HttpContext) => {
  /*
   * URL: ?name=mbappe&shirtNumber=10
   * qs: { name: 'mbappe', shirtNumber: 10 }
   */
  const queryParams = request.qs()
  console.log({ queryParams })
  console.log(queryParams.name)

  const players = await Player.query()
    .if(queryParams.name, (query) => {
      query.whereLike('full_name', `%${queryParams.name}%`)
    })
    .if(queryParams.shirtNumber, (query) => {
      query.whereLike('shirt_number', `%${queryParams.shirtNumber}%`)
    })

  const playersJSON = players.map((player) =>
    player.serialize({
      fields: {
        omit: ['id', 'createdAt', 'updatedAt'],
      },
    })
  )

  return response.status(200).send(playersJSON)
})

router.post('login', async ({ request, auth }) => {
  const { email, password } = request.all()
  const user = await User.verifyCredentials(email, password)

  return await auth.use('jwt').generate(user)
})
