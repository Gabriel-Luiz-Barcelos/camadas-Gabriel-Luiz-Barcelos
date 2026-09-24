import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'
import { Employee, NewEmployee } from '../types'
import { NotFound, RuleViolation } from '../errors'

const MINIMUM_SALARY = 1518

const INSS_RATE_BY_STATE: Record<string, number> = {
  SP: 0.11,
  RJ: 0.11,
  MG: 0.11,
  PR: 0.09,
  SC: 0.09,
  RS: 0.09,
  BA: 0.1,
  PE: 0.1,
  CE: 0.1,
  GO: 0.1,
  DF: 0.11
}

const DEFAULT_INSS_RATE = 0.11

function getInssRate(state: string): number {
  return INSS_RATE_BY_STATE[state] ?? DEFAULT_INSS_RATE
}

export class EmployeeService {
  constructor(
    private employees: EmployeeRepository,
    private companies: CompanyRepository
  ) {}

  async create(data: NewEmployee): Promise<Employee> {
    const company = this.companies.findById(data.companyId)
    if (!company) throw new NotFound('company')

    if (data.salary < MINIMUM_SALARY) {
      throw new RuleViolation('salary below minimum wage')
    }

    const inssRate = getInssRate(company.state)
    const netSalary = data.salary * (1 - inssRate)

    return this.employees.save({
      name: data.name,
      email: data.email,
      grossSalary: data.salary,
      netSalary,
      companyId: data.companyId
    })
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
    const company = this.companies.findById(companyId)
    if (!company) throw new NotFound('company')

    return this.employees.findByCompany(companyId)
  }
}