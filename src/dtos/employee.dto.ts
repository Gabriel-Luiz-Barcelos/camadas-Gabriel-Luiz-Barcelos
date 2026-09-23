import { NewEmployee } from '../types'
import { InvalidInput } from '../errors'

export function employeeDTO(body: unknown): NewEmployee {
  const data = body as Record<string, unknown>

  const name = data.name
  const email = data.email
  const salary = data.salary
  const companyId = data.companyId

  if (typeof name !== 'string' || name.trim().length < 3) {
    throw new InvalidInput('name must have at least 3 characters')
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw new InvalidInput('email must contain @')
  }

  if (typeof salary !== 'number' || salary <= 0) {
    throw new InvalidInput('salary must be a positive number')
  }

  if (typeof companyId !== 'number') {
    throw new InvalidInput('companyId must be a number')
  }

  return { name: name.trim(), email: email.trim(), salary, companyId }
}