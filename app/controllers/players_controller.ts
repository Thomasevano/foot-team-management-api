import Player from '#models/player'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { createUpdatePlayerValidator } from '#validators/player'

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
  async update({ params, request, response }: HttpContext) {
    const player: Player = await Player.findOrFail(params.id)
    const requestData = request.body()
    const payload = await createUpdatePlayerValidator.validate(requestData)

    player.firstName = payload.firstName
    player.lastName = payload.lastName
    player.fullName = payload.fullName
    player.birthDate = DateTime.fromFormat(payload.birthDate, 'yyyy-MM-dd')
    player.nationality = payload.nationality
    player.updatedAt = DateTime.local()
    await player.save()

    const updatedPlayer = await Player.findOrFail(player.id)
    const playerJSON = updatedPlayer.serialize({
      fields: {
        omit: ['id', 'createdAt', 'updatedAt'],
      },
    })

    return response.status(200).send(playerJSON)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    await player.delete()
    return response.status(204)
  }
}
