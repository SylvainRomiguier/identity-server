import { IRepository } from "./IRepository";
import { IValidator } from "./IValidator";
import { IPasswordService } from "./IPasswordService";
import { makeUser, User } from "../entities/user";

export type AddUser = (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  scopes: string[]
) => Promise<User>;

export const makeAddUser =
  (
    randomUUID: () => string,
    emailValidator: IValidator,
    passwordValidator: IValidator,
    passwordService: IPasswordService,
    repository: IRepository
  ) =>
  async (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    scopes: string[]
  ) => {
    const existingUserWithSameEmail = await repository.getUserByEmail(email);
    if (existingUserWithSameEmail) {
      throw new Error(
        `A user already exists with same email address : ${email}`
      );
    }
    if (!emailValidator(email).valid) {
      throw new Error(emailValidator(email).errorMessage);
    }

    if (!passwordValidator(password).valid) {
      throw new Error(passwordValidator(password).errorMessage);
    }

    const newUser = makeUser()(
      randomUUID(),
      firstName,
      lastName,
      userName,
      email,
      passwordService.hash(password),
      scopes
    );
    return repository.addUser(newUser);
  };
