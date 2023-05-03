import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { AppError } from "../dto";

export const notFoundErrorHandler: RequestHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError("Not Found", 404));
};

export const errorHandler: ErrorRequestHandler = (
  err: AppError | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send("Internal server error");
  }
};
