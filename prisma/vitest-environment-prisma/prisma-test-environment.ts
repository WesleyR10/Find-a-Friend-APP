import 'dotenv/config'
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string){

  if(!process.env.DATABASE_URL) throw new Error('Please provide a DATABASE_URL environment variable') // Sem url do banco de dados 

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema) // Substitui o schema do banco de dados pelo passado no parâmetro

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() { // Executa antes de cada teste
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    execSync(`npx prisma migrate deploy`)

    return {
      async teardown() { // Executa depois de cada teste
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()      
      },
    }
  },
}