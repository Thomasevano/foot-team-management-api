import Player from '#models/player'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlayersController {
  /**
   * Display a list of resource
   */
  async index() {
    const players = await Player.all()
    return players
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
