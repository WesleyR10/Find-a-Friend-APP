import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgsUseCase } from '@/use-cases/factories/make-authenticate-orgs-use-case'

export async function authenticateOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateOrgsUseCase = makeAuthenticateOrgsUseCase()

    const {org} = await authenticateOrgsUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
    {
      role: org.role,
    }, {
      sign:{sub: org.id}
    })

    const refreshToken = await reply.jwtSign(
      {
        role: org.role,
      }, { 
        sign:{
        sub: org.id,
        expiresIn: '7d',
      },
    })

    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // O cookie vai ser válido para todas as rotas
      httpOnly: true, // O cookie não vai ser acessível no front-end
      secure: true,
      sameSite: true
    })
    .status(200)
    .send({token,})

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}