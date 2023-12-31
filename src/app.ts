import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from 'zod'
import { env } from '@/env'
import { usersRoutes } from "@/http/controllers/users/routes";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import { adoptionsRoutes } from "./http/controllers/adoption/routes";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken', 
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  }
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(orgsRoutes)
app.register(petsRoutes)
app.register(adoptionsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') { // Como estamos em desenvolvimento , sempre que gera erro vai aparecer no console do terminal.
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})