import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

    const token = await reply.jwtSign(
      { role }, {
      sign:{sub: request.user.sub,}
    })

    const refreshToken = await reply.jwtSign(
      { role }, {
      sign: {
        sub: request.user.sub,
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
  }