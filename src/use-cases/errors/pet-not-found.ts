export class PetNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}