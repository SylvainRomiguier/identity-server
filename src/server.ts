import { v4 } from "uuid";
import createFastify from "fastify";
import fastifySwagger from "fastify-swagger";
import {makeTokenService} from "./infrastructure/services/tokenService";
// import express from "express";
// import { inMemoryRepository } from "./infrastructure/repositories/mockupRepository/mockupRepository";
import { makeUserController } from "./api/controllers/usersRoutes";
import { makeUseCases } from "./domain/useCases";
import { makeFastifyRouter } from "./infrastructure/routers/fastifyRouter/fastifyRouter";
// import { makeExpressRouter } from "./infrastructure/routers/expressRouter/expressRouter";
import { customEmailValidator } from "./infrastructure/validators/EmailValidator/customEmailValidator";
import { customPasswordValidator } from "./infrastructure/validators/PasswordValidator/customPasswordValidator";
import usersSample from "./mockups/usersSample.json";
import { passwordService } from "./infrastructure/services/passwordService";
import { makeMongoDBRepository } from "./infrastructure/repositories/mongoDBRepository/mongoDBRepository";
import dotenv from "dotenv";

dotenv.config({path: '.env'});

const fastify = createFastify({ logger: true });
fastify.register(fastifySwagger, {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Identity Server Swagger",
      description: "A clean architecture identity server",
      version: "0.1.0",
    },
  },
});
//const app = express();
//app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const useCases = makeUseCases(
  v4,
  customEmailValidator,
  customPasswordValidator,
  passwordService,
  makeTokenService()(),
  await makeMongoDBRepository(MONGODB_CONNECTION_STRING)()
);

// used to add samples in db
// usersSample.users.forEach(user => useCases.addUser(user.firstName, user.lastName, user.userName, user.email, user.password, user.scopes));

const router = makeFastifyRouter(fastify);
// const router = makeExpressRouter(app);

makeUserController(router, useCases)();

const start = () => {
  try {
    router.instance.listen(PORT, "0.0.0.0");
  } catch (error) {
    fastify.log.error(error);
    console.error(error.message);
    process.exit(1);
  }
};

start();
