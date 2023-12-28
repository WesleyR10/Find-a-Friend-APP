import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"
import { makeAdoptionsUseCase } from '@/use-cases/factories/make-adoptions-use-case'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'

export async function Adoption(request: FastifyRequest, reply: FastifyReply) {
  const adoptionParamsSchema = z.object({
    userId: z.string().uuid(),
    petId: z.string().uuid(),
  })

  try {
    const { userId, petId } = adoptionParamsSchema.parse(request.params)

    const adoptionPetUseCase = makeAdoptionsUseCase() 

    const adoptionDetails = await adoptionPetUseCase.execute({
      userId,
      petId,
    })
    
    return reply.status(201).send(adoptionDetails)
  } catch (err) {
    if(err instanceof PetNotFoundError){
      return reply.status(409).send({ message: err.message})
    }

    throw err
  }
}