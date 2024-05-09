import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import playerRoutes from "./players";

export function registerRoutes(fastify: FastifyInstance) {
  playerRoutes(fastify);
}