import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { registerPets } from './register'
import { search } from './search-pets-by-city'
import { filter } from './filterPet'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/orgs/:orgId/pets', {onRequest: [verifyOrgRole('ADMIN')]},registerPets)
  app.get('/pets/search', search)
  app.get('/pets/filter', filter)
}