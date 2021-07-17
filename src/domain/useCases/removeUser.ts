import { IRepository } from "../../infrastructure/repositories/IRepository";

export const makeRemoveUser = (repository: IRepository) => async (id: string) => {
  const existingUser = await repository.getUserById(id);
  if (!existingUser) {
    throw new Error(`this user id does not exist : ${id}`);
  }
  await repository.removeUser(id);
};
