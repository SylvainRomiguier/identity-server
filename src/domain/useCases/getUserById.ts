import { User } from "../entities/user";
import { IRepository } from "./IRepository";

export type GetUserById = (id: string) => Promise<User | undefined>;

export const makeGetUserById = (repository: IRepository) => async (id: string) => {
  const existingUser = await repository.getUserById(id);
  if (!existingUser) {
    throw new Error(`this user id does not exist : ${id}`);
  }
  return existingUser;
};
