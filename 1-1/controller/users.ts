import { Request, RequestHandler, Response } from "express";
import { User } from "../dto/users";

const users: User[] = [
  { id: 1, username: "rajabi" },
  { id: 2, username: "askari" },
  { id: 3, username: "ghazi moradi" },
];

export const getUsers: RequestHandler = (req: Request, res: Response): void => {
//   throw new AppError("salam", 400);
  res.send(users);
};
