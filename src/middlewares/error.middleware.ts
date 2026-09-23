import { Request, Response, NextFunction } from 'express'
import { NotFound, InvalidInput, RuleViolation } from '../errors'

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof InvalidInput) {
    return res.status(400).json({ message: error.message })
  }

  if (error instanceof NotFound) {
    return res.status(404).json({ message: error.message })
  }

  if (error instanceof RuleViolation) {
    return res.status(422).json({ message: error.message })
  }

  console.error(error)
  return res.status(500).json({ message: 'internal server error' })
}