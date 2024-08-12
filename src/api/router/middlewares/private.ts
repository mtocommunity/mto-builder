import { NextFunction, Request, Response } from 'express';

export function privateMiddleware(req: Request, res: Response, next: NextFunction) {
  // Check if the user is authenticated
  // TODO: Implement this

  next();
}
