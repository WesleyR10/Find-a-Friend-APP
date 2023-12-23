export class FilterByPetError extends Error {
  constructor() {
    super('Unable to find results for the specified filter.')
  }
}