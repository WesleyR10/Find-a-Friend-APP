import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { ORG } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterOrgUseCaseRequest { 
  name: string
  email: string
  password: string
  description: string | null;
  phone: string;
  city: string;
  address: string;
}

interface RegisterUseCaseResponse { 
  org: ORG
}  

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ name, email, password, description, phone,city,address }: RegisterOrgUseCaseRequest): Promise<RegisterUseCaseResponse>  
  {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    
    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      description,
      phone,
      city,
      address
    })

    return {org}
  }
}