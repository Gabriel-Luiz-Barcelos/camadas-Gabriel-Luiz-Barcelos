import type { Database } from 'better-sqlite3'
import { Employee } from '../types'

interface EmployeeToSave {
  name: string
  email: string
  grossSalary: number
  netSalary: number
  companyId: number
}

export class EmployeeRepository {
  constructor(private db: Database) {}

  findById(id: number): Employee | undefined {
    return this.db
      .prepare('SELECT * FROM employees WHERE id = ?')
      .get(id) as Employee | undefined
  }

  findByCompany(companyId: number): Employee[] {
    return this.db
      .prepare('SELECT * FROM employees WHERE company_id = ?')
      .all(companyId) as Employee[]
  }

  save(employee: EmployeeToSave): Employee {
    const result = this.db
      .prepare(
        'INSERT INTO employees (name, email, gross_salary, net_salary, company_id) VALUES (?, ?, ?, ?, ?)'
      )
      .run(employee.name, employee.email, employee.grossSalary, employee.netSalary, employee.companyId)

    return this.findById(result.lastInsertRowid as number) as Employee
  }
}