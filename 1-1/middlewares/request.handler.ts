import { Request, Response, NextFunction, RequestHandler } from "express";

export const requestHandler = (controller: RequestHandler): RequestHandler => {
  const innerRequestHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
  return innerRequestHandler;
};
