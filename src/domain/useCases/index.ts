import { AddUser, makeAddUser } from "./addUser";
import { makeRemoveUser, RemoveUser } from "./removeUser";
import { makeUpdateUser, UpdateUser } from "./updateUser";
import { GetUserById, makeGetUserById } from "./getUserById";
import { GetAllUsers, makeGetAllUsers } from "./getAllUsers";
import { IRepository } from "./IRepository";
import { IValidator } from "./IValidator";
import { IPasswordService } from "./IPasswordService";
import { ITokenService } from "./ITokenService";
import { Login, makeLogin } from "./login";
import { makeVerifyToken, VerifyToken } from "./verifyToken";

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
