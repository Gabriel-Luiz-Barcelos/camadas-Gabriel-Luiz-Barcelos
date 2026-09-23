import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'
import { Employee, NewEmployee } from '../types'
import { NotFound, RuleViolation } from '../errors'

const MINIMUM_SALARY = 1518
const INSS_RATE = 0.11

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

    const netSalary = data.salary * (1 - INSS_RATE)

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