import { NewCompany } from '../types'
import { InvalidInput } from '../errors'

export function companyDTO(body: unknown): NewCompany {
  const data = body as Record<string, unknown>

  const name = data.name
  const cnpj = data.cnpj
  const state = data.state

  if (typeof name !== 'string' || name.trim().length < 3) {
    throw new InvalidInput('name must have at least 3 characters')
  }

  if (typeof cnpj !== 'string' || !/^\d{14}$/.test(cnpj)) {
    throw new InvalidInput('cnpj must have exactly 14 digits')
  }

  if (typeof state !== 'string' || !/^[A-Za-z]{2}$/.test(state)) {
    throw new InvalidInput('state must have exactly 2 letters')
  }

  return { name: name.trim(), cnpj, state: state.toUpperCase() }
}