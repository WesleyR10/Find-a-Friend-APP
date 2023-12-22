import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest { // Vou receber esses dados do controller
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse { // Vou retornar esses dados para o controller
  user: User
}  

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>  
  {
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {user}
  }
}