import { makeAddUser } from "./addUser";
import { makeRemoveUser } from "./removeUser";
import { makeUpdateUser } from "./updateUser";
import { makeGetUserById } from "./getUserById";
import { makeGetAllUsers } from "./getAllUsers";
import { IRepository } from "../../infrastructure/repositories/IRepository";
import { User } from "../entities/user";
import { IValidator } from "../../infrastructure/validators/IValidator";
import { IPasswordService } from "../../infrastructure/services/IPasswordService";
import { ITokenService } from "../../infrastructure/services/ITokenService";
import { makeLogin } from "./login";
import { makeVerifyToken, UserPayloadDto } from "./verifyToken";

export type AddUser = (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  scopes: string[]
) => Promise<User>;

export type UpdateUser = (
  id: string,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  scopes: string[]
) => Promise<User>;

export type RemoveUser = (id: string) => Promise<void>;

export type GetUserById = (id: string) => Promise<User | undefined>;

export type GetAllUsers = () => Promise<User[]>;

export type Login = (email: string, password: string) => Promise<string>;

export type VerifyToken = (token: string) => UserPayloadDto;

export interface UseCases {
  addUser: AddUser;
  updateUser: UpdateUser;
  removeUser: RemoveUser;
  getUserById: GetUserById;
  getAllUsers: GetAllUsers;
  login: Login;
  verifyToken: VerifyToken;
}

export const makeUseCases = (
  randomUUID: () => string,
  emailValidator: IValidator,
  passwordValidator: IValidator,
  passwordService: IPasswordService,
  tokenService: ITokenService,
  repository: IRepository
): UseCases =>
  Object.freeze({
    addUser: makeAddUser(
      randomUUID,
      emailValidator,
      passwordValidator,
      passwordService,
      repository
    ),
    removeUser: makeRemoveUser(repository),
    updateUser: makeUpdateUser(
      emailValidator,
      passwordValidator,
      passwordService,
      repository
    ),
    getUserById: makeGetUserById(repository),
    getAllUsers: makeGetAllUsers(repository),
    login: makeLogin(passwordService, tokenService, repository),
    verifyToken: makeVerifyToken(tokenService),
  });
