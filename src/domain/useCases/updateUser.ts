import { IRepository } from "./IRepository";
import { IValidator } from "./IValidator";
import { IPasswordService } from "./IPasswordService";
import { makeUser, User } from "../entities/user";

export type UpdateUser = (
  id: string,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  scopes: string[]
) => Promise<User>;

export const makeUpdateUser =
  (emailValidator: IValidator, passwordValidator: IValidator, passwordService: IPasswordService, repository: IRepository) =>
  async (
    id: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    password?: string,
    scopes?: string[]
  ) => {
    if(email) {
        const existingUserWithSameEmail = await repository.getUserByEmail(email);
        if (existingUserWithSameEmail && existingUserWithSameEmail.id !== id) {
          throw new Error(
            `A user already exists with same email address : ${email}`
          );
        }
        if (!emailValidator(email).valid) {
          throw new Error(emailValidator(email).errorMessage);
        }
    }

    if(password) {
      if(!passwordValidator(password).valid) {
        throw new Error(passwordValidator(password).errorMessage);
      }
    }

    const existingUser = await repository.getUserById(id);

    if(!existingUser) {
        throw new Error(`User with id : ${id} does not exist.`);
    }
    
    const newUser = makeUser()(
      id,
      firstName || existingUser.firstName,
      lastName || existingUser.lastName,
      userName || existingUser.userName,
      email || existingUser.email,
      password ? passwordService.hash(password) : existingUser.password,
      scopes || [] as string[]
    );
    return await repository.updateUser(newUser);
  };
