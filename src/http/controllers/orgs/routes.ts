import { FastifyInstance } from 'fastify'

import { registerOrgs } from './register'
import { authenticateOrgs } from './authenticate'
import { refreshOrg } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgs)
  app.post('/sessionsOrg', authenticateOrgs)

  app.patch('/token/refreshOrg', refreshOrg)
}