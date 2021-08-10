import { User } from "../entities/user";
import { IRepository } from "./IRepository";

export type GetAllUsers = () => Promise<User[]>;

export const makeGetAllUsers = (repository: IRepository) => async () =>
  await repository.getAllUsers();
