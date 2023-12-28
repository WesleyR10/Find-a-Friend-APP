import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsByCityUseCase } from '@/use-cases/factories/make-search-pets-by-city-use-case'


export async function search(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = filterPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsByCityUseCase()

  const { pets } = await searchPetsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}