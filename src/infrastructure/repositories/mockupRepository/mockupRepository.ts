import { UserDto, userDtoToDomain } from "../../../infrastructure/Dto/UserDto";
import { IRepository } from "../../../domain/useCases/IRepository";

export const inMemoryRepository = ():IRepository => {
  let users:UserDto[] = [];

  const getAllUsers = async () => await users.map((u) => userDtoToDomain(u));
  const addUser = async (user: UserDto) => {
    users.push(user);
    return await userDtoToDomain(user);
  };
  const removeUser = async (id: string) => {
    users = [...users.filter((u) => u.id !== id)];
  };
  const updateUser = async (user: UserDto) => {
    removeUser(user.id);
    addUser(user);
    return await userDtoToDomain(user);
  };
  const getUserByEmail = async (email: string) => {
    const existingUser = await users.find((u) => u.email === email);
    if (existingUser) {
      return userDtoToDomain(existingUser);
    }
    return undefined;
  };
  const getUserById = async (id: string) => {
    const existingUser = await users.find((u) => u.id === id);
    if (existingUser) {
      return userDtoToDomain(existingUser);
    }
    return undefined;
  };

  return Object.freeze({
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
    getUserByEmail,
    getUserById,
  });
};
