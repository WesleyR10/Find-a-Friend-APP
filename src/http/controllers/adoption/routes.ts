import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { Adoption } from './adoption'

export async function adoptionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/:userId/:petId/adoption', Adoption)
}