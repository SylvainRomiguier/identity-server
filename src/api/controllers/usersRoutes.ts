import { UseCases } from "../../domain/useCases";
import { IRouter } from "../../infrastructure/routers/IRouter";
import {
  deleteUser,
  getUserById,
  getUsers,
  login,
  postNewUser,
  putUpdatedUser,
  verifyToken,
} from "./usersHandlers";
import { authorizationMiddleware } from "./usersMiddleware";

const BASE_ROUTE = "/users";

export const makeUserController =
  (router: IRouter, useCases: UseCases) => () => {

    router.get(BASE_ROUTE, authorizationMiddleware(useCases.verifyToken, ["admin"], getUsers(useCases.getAllUsers)));

    router.get(`${BASE_ROUTE}/:id`, authorizationMiddleware(useCases.verifyToken, ["admin", "self"], getUserById(useCases.getUserById)));

    router.post(BASE_ROUTE, authorizationMiddleware(useCases.verifyToken, ["admin"], postNewUser(useCases.addUser)));

    router.put(`${BASE_ROUTE}/:id`, authorizationMiddleware(useCases.verifyToken, ["admin", "self"], putUpdatedUser(useCases.updateUser)));

    router.delete(`${BASE_ROUTE}/:id`, authorizationMiddleware(useCases.verifyToken, ["admin"], deleteUser(useCases.removeUser)));

    router.post(`${BASE_ROUTE}/login`, login(useCases.login));

    router.get(`${BASE_ROUTE}/verify`, verifyToken(useCases.verifyToken));
  };
