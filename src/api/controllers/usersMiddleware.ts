import { VerifyToken } from "../../domain/useCases";
import { Handler } from "../../infrastructure/routers/IRouter";
import { IncomingUserDto } from "../Dto/IncomingUserDto";

const checkScopes = (
  requiredScopes: string[],
  userScopes: string[]
): boolean => {
  console.log(JSON.stringify(requiredScopes), " -- ", JSON.stringify(userScopes));
  
  let scopeOK = false;

  userScopes.forEach(scope => {
    if(requiredScopes.includes(scope)) {
      scopeOK = true;
    }
  })
  return scopeOK;
};

export const authorizationMiddleware =
  (
    verifyToken: VerifyToken,
    requiredScopes: string[],
    next: Handler
  ): Handler =>
  (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
      if (token) {
        const user = verifyToken(token);
        if (user) {
          if (!checkScopes(requiredScopes, user.scopes)) {
            return res.status(403).send("you do not have the rights in scopes to do that.");
          }
          const { id } = req.params as { id: string };
          // seuls les admins peuvent modifier d'autres utilisateurs
          if (id && id !== user.id && !user.scopes.includes("admin")) {
            return res.status(403).send("you do not have the rights to modify another user.");
          }
          // un utilisateur peut se modifier lui-même sur le scope self est déclaré sur la route
          if (
            id &&
            id === user.id &&
            requiredScopes.includes("self")
            && !user.scopes.includes("self")
            || (req.body && (req.body as IncomingUserDto).scopes !== undefined)
          ) {
            return res.status(403).send("you do not have the rights to do that.");
          }
          next(req, res);
        } else {
          res.status(401).send("you are not authorized.");
        }
      } else {
        res.status(401).send("you are not authorized.");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };
