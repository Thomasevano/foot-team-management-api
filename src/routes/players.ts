import { FastifyInstance } from 'fastify'
import db from '../db'
import { getPlayersSerializer } from '../serializer/players';

export default async function playerRoutes(fastify: FastifyInstance) {

  fastify.get('/players', getPlayersSerializer, async(request, reply) => {
      const players = await db.player.findMany()
      if (players.length === 0) {
        throw new Error('No players found')
      }
      reply.status(200).send({players});
  });
}