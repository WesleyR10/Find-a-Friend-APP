import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateOrgsUseCase } from '@/use-cases/factories/make-create-orgs-use-case'


export async function registerOrgs(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    description: z.string().nullable(),
    phone: z.string().min(9),
    city: z.string(),
    address: z.string(),
  })

  const { name, email, password, description, phone, city, address } = registerBodySchema.parse(request.body) // Parse gera erro caso de false não deixando o código continuar

  try {
    const registerOrgUseCase = makeCreateOrgsUseCase() 

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      description,
      phone,
      city,
      address,
    })
  } catch (err) {
    if(err instanceof UserAlreadyExistsError){
      return reply.status(409).send({ message: err.message})
    }

    throw err
  }

  return reply.status(201).send()
}