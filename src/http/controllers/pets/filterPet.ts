import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFilterPetByCharacteristicsUseCase } from '@/use-cases/factories/make-filter-pet-by-characteristics-use-case'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    animalType: z.string().optional(),
    breed: z.string().optional(),
    size: z.string().optional(),
    age: z.coerce.number().optional(),
    name: z.string().optional(),
    available: z.boolean().optional(),
  })

  try {
  const { animalType, breed, age, name, size, available } = filterPetsQuerySchema.parse(request.query)

  const filterPetsUseCase = makeFilterPetByCharacteristicsUseCase()

  const { pets } = await filterPetsUseCase.execute({
      animalType,
      breed,
      size,
      age,
      name,
      available,
  })

  return reply.status(200).send({
    pets,
  })
} catch (error) {
  return reply.status(400).send({
    message: 'Erro na validação dos parâmetros',
  })
}
}