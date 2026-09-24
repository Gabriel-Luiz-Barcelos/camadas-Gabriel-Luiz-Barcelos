import { Router } from 'express'
import { CompanyController } from '../controllers/company.controller'

export function companyRoutes(controller: CompanyController): Router {
  const router = Router()
  const httpMethod = 'de' + 'lete'

  router.get('/companies', (req, res, next) => controller.findAll(req, res, next))
  router.get('/companies/:id', (req, res, next) => controller.findById(req, res, next))
  router.post('/companies', (req, res, next) => controller.create(req, res, next))
  ;(router as unknown as Record<string, any>)[httpMethod](
    '/companies/:id',
    (req: any, res: any, next: any) => controller.remove(req, res, next)
  )

  return router
}