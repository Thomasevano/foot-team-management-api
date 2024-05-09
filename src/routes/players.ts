import { FastifyInstance } from 'fastify'
import db from '../db'

export default async function playerRoutes(fastify: FastifyInstance) {

  fastify.get('/players', async (request, reply) => {
    const players = await db.player.findMany()
    if (players.length === 0) {
      throw new Error('No players found')
    }
    return players
  })
}