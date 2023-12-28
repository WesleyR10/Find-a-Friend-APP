import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

  export async function createAndAuthenticateOrgs(
    app: FastifyInstance,
    isAdmin = false,
  ) {
    const org = await prisma.oRG.create({
      data: {
        name: 'org_title',
        email: 'org@email.com',
        password_hash: await hash('123456', 6),
        description: 'Org da região de Rio do Sul',
        phone: '47 99999-9999',
        city: 'Rio do Sul',
        address: 'Rua Teste, 123',
        role: isAdmin ? 'ADMIN' : 'MEMBER',
      },
    })

  const authResponse = await request(app.server).post('/sessionsOrg').send({
    email: 'org@email.com',
    password: '123456',
  })

  const { token } = authResponse.body
  const orgId = org.id

  return {token, orgId}
}