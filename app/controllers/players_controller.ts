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
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUpdatePlayerValidator)

    const player = await Player.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      birthDate: DateTime.fromFormat(payload.birthDate, 'yyyy-MM-dd'),
      nationality: payload.nationality,
    })

    return response.status(201).send(player.$isPersisted)
  }

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
    const payload = await request.validateUsing(createUpdatePlayerValidator)

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
