import { IRepository } from "../../infrastructure/repositories/IRepository";

export const makeGetUserById = (repository: IRepository) => async (id: string) => {
  const existingUser = await repository.getUserById(id);
  if (!existingUser) {
    throw new Error(`this user id does not exist : ${id}`);
  }
  return existingUser;
};
