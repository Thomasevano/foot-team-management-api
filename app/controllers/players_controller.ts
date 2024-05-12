import Player from '#models/player'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlayersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const players = await Player.all()
    const playersJSON = players.map((player) =>
      player.serialize({
        fields: {
          omit: ['id', 'createdAt', 'updatedAt'],
        },
      })
    )
    return response.status(200).send({ data: playersJSON })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    const playerJSON = player.serialize({
      fields: {
        omit: ['id', 'createdAt', 'updatedAt'],
      },
    })

    return response.status(200).send(playerJSON)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    await player.delete()
    return response.status(204)
  }
}
