export class OrgNotFoundError extends Error {
  constructor() {
    super('ORG not found')
  }
}