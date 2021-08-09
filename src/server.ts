import { v4 } from "uuid";
import createFastify from "fastify";
import fastifySwagger from "fastify-swagger";
import fastifyCors from "fastify-cors";
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
import fs from "fs";

dotenv.config({path: '.env'});

const fastify = createFastify({ logger: true });
fastify.register(fastifySwagger, {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Identity Server Swagger",
      description: "A clean architecture identity server",
      version: "1.0.0",
    },
  },
});
fastify.register(fastifyCors, {
  origin: "*",
  methods: "GET,PUT,POST,DELETE,OPTIONS"
});
//const app = express();
//app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const TOKEN_KEYS_PATH=process.env.TOKEN_KEYS_PATH
const PRIVATE_KEY=fs.readFileSync(`${TOKEN_KEYS_PATH}token.key`, "utf8");
const PUBLIC_KEY=fs.readFileSync(`${TOKEN_KEYS_PATH}token.key.pub`, "utf8");

const useCases = makeUseCases(
  v4,
  customEmailValidator,
  customPasswordValidator,
  passwordService,
  makeTokenService(PRIVATE_KEY, PUBLIC_KEY)(),
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
