import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPets(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    animalType: z.string(),
    name: z.string(),
    breed: z.string().nullable(),
    size: z.string().nullable(),
    age: z.number().nullable(),
  })

  const createPetsParamsSchema = z.object({
    orgId: z.string(),
  })
  try {
    const { orgId } = createPetsParamsSchema.parse(request.params)
    const { animalType, name, breed, size, age } = registerBodySchema.parse(request.body)

    const registerPetUseCase = makeRegisterPetUseCase() 

    const registeredPet = await registerPetUseCase.execute({
      animalType,
      name,
      breed,
      size,
      age,
      orgId,
    })
    return reply.status(201).send({registeredPet})

  } catch (err) {
    if(err instanceof OrgNotFoundError){
      return reply.status(409).send({ message: err.message})
    }

    throw err
  }
}