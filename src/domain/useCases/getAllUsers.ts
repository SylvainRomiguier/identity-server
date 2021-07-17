import { IRepository } from "../../infrastructure/repositories/IRepository";

export const makeGetAllUsers = (repository: IRepository) => async () =>
  await repository.getAllUsers();
