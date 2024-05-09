import Fastify from 'fastify'
import cors from '@fastify/cors'
import db from './db'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  const players = await db.player.findMany()
  return players
})

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

/**
 * Run the server!
 */
const port = Number(process.env.PORT ?? 3000)
const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
