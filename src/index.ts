import Fastify from 'fastify'
import cors from '@fastify/cors'
import { registerRoutes } from './routes';

const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

registerRoutes(fastify)

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
